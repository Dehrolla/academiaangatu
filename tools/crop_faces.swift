// Recorta fotos de professores com enquadramento padronizado no rosto.
//
//   swift tools/crop_faces.swift <pasta-de-origem> <pasta-de-destino> [--estender] [--rosto=0.42]
//
// --estender: quando a foto é apertada demais para o enquadramento padrão, em vez
// de aumentar o rosto, completa as bordas com uma versão desfocada da própria foto.
// --rosto=N: altura do rosto em relação ao recorte (padrão 0.42).
// --centro-x=N: posição horizontal do centro do rosto no recorte (padrão 0.5 = centralizado).
// --nitidez[=N]: aplica nitidez leve (unsharp mask) no resultado; N é a intensidade (padrão 0.45).
//   Use só em fotos de origem pequena; não recupera detalhe, apenas define bordas.
//
// Para cada imagem: detecta o maior rosto (framework Vision do macOS), recorta
// na proporção do card (4:3,4) com o rosto centralizado e ocupando FACE_RATIO
// da altura, e exporta um JPEG de OUT_W x OUT_H. Imagens sem rosto detectado
// são listadas e ignoradas.

import AppKit
import CoreImage
import Foundation
import ImageIO
import UniformTypeIdentifiers
import Vision

let OUT_W = 800.0, OUT_H = 680.0          // mesma proporção do .teacher__photo (4 / 3.4)
var FACE_RATIO = 0.42                       // altura do rosto em relação à altura do recorte
var FACE_CENTER_X = 0.5                     // centro do rosto na horizontal (0.5 = centralizado)
let FACE_CENTER_Y = 0.46                    // centro do rosto a 46% do topo (sobra espaço acima da cabeça)
let QUALITY = 0.82

let allArgs = CommandLine.arguments
let EXTEND = allArgs.contains("--estender")
if let r = allArgs.first(where: { $0.hasPrefix("--rosto=") }), let v = Double(r.dropFirst(8)) { FACE_RATIO = v }
if let r = allArgs.first(where: { $0.hasPrefix("--centro-x=") }), let v = Double(r.dropFirst(11)) { FACE_CENTER_X = v }
var SHARPEN = 0.0
if let r = allArgs.first(where: { $0.hasPrefix("--nitidez") }) { SHARPEN = Double(r.dropFirst(10)) ?? 0.45 }
let args = allArgs.filter { !$0.hasPrefix("--") }
guard args.count == 3 else { print("uso: swift crop_faces.swift <origem> <destino> [--estender] [--rosto=0.42] [--centro-x=0.5] [--nitidez[=0.45]]"); exit(1) }
let src = URL(fileURLWithPath: args[1]), dst = URL(fileURLWithPath: args[2])
try? FileManager.default.createDirectory(at: dst, withIntermediateDirectories: true)

func orientedImage(_ url: URL) -> CGImage? {
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil) else { return nil }
    let opts: [CFString: Any] = [
        kCGImageSourceCreateThumbnailFromImageAlways: true,
        kCGImageSourceCreateThumbnailWithTransform: true,   // aplica a orientação EXIF
        kCGImageSourceThumbnailMaxPixelSize: 6000,
    ]
    return CGImageSourceCreateThumbnailAtIndex(source, 0, opts as CFDictionary)
}

let files = (try FileManager.default.contentsOfDirectory(at: src, includingPropertiesForKeys: nil))
    .filter { ["jpg", "jpeg", "png", "heic", "webp"].contains($0.pathExtension.lowercased()) }
    .sorted { $0.lastPathComponent < $1.lastPathComponent }

for file in files {
    let name = file.deletingPathExtension().lastPathComponent
    guard let img = orientedImage(file) else { print("\(name): não abriu"); continue }
    let W = Double(img.width), H = Double(img.height)

    let req = VNDetectFaceRectanglesRequest()
    try VNImageRequestHandler(cgImage: img, options: [:]).perform([req])
    guard let face = (req.results ?? []).max(by: { $0.boundingBox.height < $1.boundingBox.height }) else {
        print("\(name): nenhum rosto detectado (ignorada)"); continue
    }
    // Vision usa coordenadas normalizadas com origem embaixo à esquerda.
    let fb = face.boundingBox
    let fh = fb.height * H
    let fcx = fb.midX * W
    let fcy = (1 - fb.midY) * H

    var ch = fh / FACE_RATIO
    var cw = ch * OUT_W / OUT_H
    var x = fcx - cw * FACE_CENTER_X
    var y = fcy - ch * FACE_CENTER_Y
    var scale = 1.0
    if !EXTEND {
        // Se o recorte ideal não cabe na foto, reduz (o rosto fica um pouco maior).
        scale = min(1, W / cw, H / ch)
        cw *= scale; ch *= scale
        x = fcx - cw * FACE_CENTER_X
        y = fcy - ch * FACE_CENTER_Y
        x = max(0, min(x, W - cw))
        y = max(0, min(y, H - ch))
    } else {
        // Mantém o rosto no tamanho padrão; só encosta nas bordas onde a foto permite.
        if cw <= W { x = max(0, min(x, W - cw)) }
        if ch <= H { y = max(0, min(y, H - ch)) }
    }

    let ctx = CGContext(data: nil, width: Int(OUT_W), height: Int(OUT_H), bitsPerComponent: 8, bytesPerRow: 0,
                        space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
    ctx.interpolationQuality = .high
    ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))   // fundo branco para PNG transparente
    ctx.fill(CGRect(x: 0, y: 0, width: OUT_W, height: OUT_H))
    let k = OUT_H / ch                                                // escala foto -> saída
    let extended = EXTEND && (x < 0 || y < 0 || x + cw > W || y + ch > H)
    // Foto original posicionada na saída (origem embaixo à esquerda, como no CGContext).
    let photoRect = CGRect(x: -x * k, y: OUT_H - (-y * k + H * k), width: W * k, height: H * k)
    if extended {
        let canvas = CGRect(x: 0, y: 0, width: OUT_W, height: OUT_H)
        let src = CIImage(cgImage: img)
        // Fundo: a própria foto ampliada para cobrir o card e bem desfocada.
        let fill = max(OUT_W / W, OUT_H / H)
        let background = src.clampedToExtent().applyingGaussianBlur(sigma: 40)
            .cropped(to: src.extent)
            .transformed(by: CGAffineTransform(scaleX: fill, y: fill))
            .transformed(by: CGAffineTransform(translationX: (OUT_W - W * fill) / 2, y: (OUT_H - H * fill) / 2))
        let sharp = src.transformed(by: CGAffineTransform(scaleX: k, y: k))
            .transformed(by: CGAffineTransform(translationX: photoRect.minX, y: photoRect.minY))
        // Máscara: branca sobre a foto, com degradê de FEATHER px nas bordas que foram estendidas.
        let FEATHER = 70.0
        func ramp(_ from: CGPoint, _ to: CGPoint) -> CIImage {
            CIFilter(name: "CILinearGradient", parameters: [
                "inputPoint0": CIVector(cgPoint: from), "inputColor0": CIColor.black,
                "inputPoint1": CIVector(cgPoint: to), "inputColor1": CIColor.white,
            ])!.outputImage!
        }
        var mask = CIImage(color: .white).cropped(to: canvas)
        var ramps: [CIImage] = []
        if photoRect.minX > 0 { ramps.append(ramp(CGPoint(x: photoRect.minX, y: 0), CGPoint(x: photoRect.minX + FEATHER, y: 0))) }
        if photoRect.maxX < OUT_W { ramps.append(ramp(CGPoint(x: photoRect.maxX, y: 0), CGPoint(x: photoRect.maxX - FEATHER, y: 0))) }
        if photoRect.minY > 0 { ramps.append(ramp(CGPoint(x: 0, y: photoRect.minY), CGPoint(x: 0, y: photoRect.minY + FEATHER))) }
        if photoRect.maxY < OUT_H { ramps.append(ramp(CGPoint(x: 0, y: photoRect.maxY), CGPoint(x: 0, y: photoRect.maxY - FEATHER))) }
        for r in ramps { mask = r.cropped(to: canvas).applyingFilter("CIMultiplyCompositing", parameters: [kCIInputBackgroundImageKey: mask]) }
        let composite = sharp.applyingFilter("CIBlendWithMask", parameters: [
            kCIInputBackgroundImageKey: background, kCIInputMaskImageKey: mask,
        ]).cropped(to: canvas)
        ctx.draw(CIContext().createCGImage(composite, from: canvas)!, in: canvas)
    } else {
        ctx.draw(img, in: photoRect)
    }
    let out = dst.appendingPathComponent("\(name).jpg")
    let dest = CGImageDestinationCreateWithURL(out as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
    var final = ctx.makeImage()!
    if SHARPEN > 0 {
        let sharp = CIImage(cgImage: final).applyingFilter("CIUnsharpMask", parameters: [
            kCIInputRadiusKey: 1.6, kCIInputIntensityKey: SHARPEN,
        ]).cropped(to: CGRect(x: 0, y: 0, width: OUT_W, height: OUT_H))
        final = CIContext().createCGImage(sharp, from: sharp.extent, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)!
    }
    CGImageDestinationAddImage(dest, final, [kCGImageDestinationLossyCompressionQuality: QUALITY] as CFDictionary)
    CGImageDestinationFinalize(dest)

    let upscale = OUT_H / ch
    let note = scale < 1 ? " · foto apertada, rosto ficou maior" : (extended ? " · bordas estendidas com desfoque" : "")
    let soft = upscale > 1.5 ? " · baixa resolução (ampliada \(String(format: "%.1f", upscale))x)" : ""
    print("\(name): rosto \(Int(fh))px, recorte \(Int(cw))x\(Int(ch))\(note)\(soft)")
}
