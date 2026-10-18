/**
 * Academia Angatu — recebe os leads da pré-venda e grava na planilha.
 *
 * Instalação: veja README.md nesta pasta.
 * Este script fica vinculado à planilha (Extensões > Apps Script) e é
 * publicado como "App da Web". A URL /exec vai no data-endpoint do formulário.
 */

// ID da planilha (trecho da URL entre /d/ e /edit). Assim o script funciona
// tanto vinculado à planilha quanto como projeto avulso em script.google.com.
const SPREADSHEET_ID = '1TvSn0Ide2jgmk8Q0ixrEGDw_ukiTrhhQiV_jt9_F2r4';
const SHEET_NAME = 'Leads pré-venda';
const HEADERS = ['Data/hora', 'Nome', 'E-mail', 'WhatsApp', 'Origem', 'Página'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // evita linhas trocadas com envios simultâneos

  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Campo invisível preenchido só por robôs: responde ok e descarta.
    if (data.website) return json({ ok: true });

    const nome = clean(data.nome);
    const email = clean(data.email).toLowerCase();
    const whatsapp = String(data.whatsapp || '').replace(/\D/g, '');

    if (nome.split(/\s+/).length < 2) return json({ ok: false, error: 'nome' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ ok: false, error: 'email' });
    if (whatsapp.length < 10 || whatsapp.length > 13) return json({ ok: false, error: 'whatsapp' });

    getSheet().appendRow([
      new Date(),
      safe(nome),
      safe(email),
      "'" + whatsapp,          // grava como texto para manter o zero/DDD
      safe(clean(data.origem)),
      safe(clean(data.pagina))
    ]);

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'server' });
  } finally {
    lock.releaseLock();
  }
}

// Abrir a URL /exec no navegador mostra se o app está no ar.
function doGet() {
  return json({ ok: true, status: 'online' });
}

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function clean(value) {
  return String(value || '').trim().slice(0, 200);
}

// Impede que um valor como "=IMPORTXML(...)" vire fórmula na planilha.
function safe(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
