// Recorta fotos de professores com enquadramento padronizado no rosto.
//
//   swift tools/crop_faces.swift <pasta-de-origem> <pasta-de-destino>
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
let FACE_RATIO = 0.42                       // altura do rosto em relação à altura do recorte
let FACE_CENTER_Y = 0.46                    // centro do rosto a 46% do topo (sobra espaço acima da cabeça)
let QUALITY = 0.82

let args = CommandLine.arguments
guard args.count == 3 else { print("uso: swift crop_faces.swift <origem> <destino>"); exit(1) }
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
    // Se o recorte ideal não cabe na foto, reduz (o rosto fica um pouco maior).
    let scale = min(1, W / cw, H / ch)
    cw *= scale; ch *= scale
    var x = fcx - cw / 2
    var y = fcy - ch * FACE_CENTER_Y
    x = max(0, min(x, W - cw))
    y = max(0, min(y, H - ch))

    guard let cropped = img.cropping(to: CGRect(x: x, y: y, width: cw, height: ch)) else { continue }
    let ctx = CGContext(data: nil, width: Int(OUT_W), height: Int(OUT_H), bitsPerComponent: 8, bytesPerRow: 0,
                        space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
    ctx.interpolationQuality = .high
    ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))   // fundo branco para PNG transparente
    ctx.fill(CGRect(x: 0, y: 0, width: OUT_W, height: OUT_H))
    ctx.draw(cropped, in: CGRect(x: 0, y: 0, width: OUT_W, height: OUT_H))
    let out = dst.appendingPathComponent("\(name).jpg")
    let dest = CGImageDestinationCreateWithURL(out as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
    CGImageDestinationAddImage(dest, ctx.makeImage()!, [kCGImageDestinationLossyCompressionQuality: QUALITY] as CFDictionary)
    CGImageDestinationFinalize(dest)

    let upscale = OUT_H / ch
    let note = scale < 1 ? " · foto apertada, rosto ficou maior" : ""
    let soft = upscale > 1.5 ? " · baixa resolução (ampliada \(String(format: "%.1f", upscale))x)" : ""
    print("\(name): rosto \(Int(fh))px, recorte \(Int(cw))x\(Int(ch))\(note)\(soft)")
}
