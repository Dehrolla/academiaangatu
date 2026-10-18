#!/usr/bin/env python3
"""
Gera os 3 blocos de código para colar na página do Webflow a partir de site/index.html.

    python3 tools/build_webflow.py            # usa a BASE_URL padrão (GitHub Pages)
    python3 tools/build_webflow.py https://outro-host/site/

Saída em webflow/:
  1-head.html    -> Configurações da página > Custom code > Inside <head> tag
  2-embed.html   -> Elemento "Code Embed" no corpo da página
  3-footer.html  -> Configurações da página > Custom code > Before </body> tag

Os blocos 1 e 3 apontam para os arquivos hospedados (CSS/JS). Mudanças só nesses
arquivos não exigem colar nada de novo no Webflow. O bloco 2 só muda quando o HTML
da página muda.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE_URL = "https://dehrolla.github.io/academiaangatu/site/"
WEBFLOW_LIMIT = 50_000  # limite de caracteres de um Code Embed / custom code do Webflow


def absolute(url: str, base: str) -> str:
    if re.match(r"^(https?:|mailto:|tel:|#|data:)", url):
        return url
    url = re.sub(r"\?v=\d+$", "", url)  # o host já controla o cache; sem versão no Webflow
    if url.startswith("../"):
        return base.rstrip("/").rsplit("/", 1)[0] + "/" + url[3:]
    return base + url


def main() -> None:
    base = sys.argv[1] if len(sys.argv) > 1 else BASE_URL
    if not base.endswith("/"):
        base += "/"
    html = (ROOT / "site" / "index.html").read_text(encoding="utf8")

    head_links = re.findall(r'<link rel="stylesheet" href="([^"]+)">', html)
    scripts = re.findall(r'<script src="([^"]+)"></script>', html)
    body = re.search(r"<body>(.*?)<script src=", html, re.S).group(1).strip()

    body = re.sub(r'(src|href)="([^"]+)"', lambda m: f'{m.group(1)}="{absolute(m.group(2), base)}"', body)
    body = re.sub(r"\n\s*\n+", "\n", body)

    head = "<!-- Academia Angatu: estilos (hospedados em " + base + ") -->\n" + "\n".join(
        f'<link rel="stylesheet" href="{absolute(h, base)}">' for h in head_links
    ) + '\n<meta name="theme-color" content="#0e1d1c">\n'
    footer = "<!-- Academia Angatu: conteúdo e formulários -->\n" + "\n".join(
        f'<script src="{absolute(s, base)}"></script>' for s in scripts
    ) + "\n"
    embed = "<!-- Academia Angatu: gerado por tools/build_webflow.py; não edite no Webflow -->\n" + body + "\n"

    out = ROOT / "webflow"
    out.mkdir(exist_ok=True)
    for name, content in (("1-head.html", head), ("2-embed.html", embed), ("3-footer.html", footer)):
        (out / name).write_text(content, encoding="utf8")
        status = "OK" if len(content) <= WEBFLOW_LIMIT else "ACIMA DO LIMITE"
        print(f"webflow/{name}: {len(content):,} caracteres ({status})")


if __name__ == "__main__":
    main()
