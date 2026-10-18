# academiaangatu
Repositório pra desenvolver os sites de venda da Academia Angatu

## Estrutura

| Pasta | O que tem |
|---|---|
| `design-system/` | Tokens e componentes extraídos do angatumedicinal.org + `style-guide.html` para visualizar |
| `site/` | Landing page do curso *Introdução à Prescrição de Cannabis Medicinal* (tema escuro) |
| `site/js/content.js` | Conteúdo editável: professores, módulos/aulas e URL de captura de leads |
| `integrations/google-sheets/` | Apps Script que grava os leads da pré-venda numa planilha |
| `webflow/` | Blocos prontos para colar na página do Webflow (gerados, não editar à mão) |
| `tools/build_webflow.py` | Gera os blocos de `webflow/` a partir de `site/index.html` |

## Como a página vai ao ar

A página fica em **angatumedicinal.org/academia/pre-venda**, dentro do Webflow. Os arquivos CSS, JS e imagens são servidos pelo GitHub Pages deste repositório (`https://dehrolla.github.io/academiaangatu/`).

- **Mudou CSS, JS, imagens ou `content.js`?** Basta fazer commit e push para `main`. O GitHub Pages publica em cerca de 1 minuto, e o cache dos visitantes expira em até 10 minutos. Não precisa mexer no Webflow.
- **Mudou o HTML (`site/index.html`)?** Rode `python3 tools/build_webflow.py`, faça commit e push, cole o conteúdo de `webflow/2-embed.html` no Code Embed da página no Webflow e clique em **Publish**.

## Pré-visualizar localmente

```bash
python3 -m http.server 8766
```

Depois, abra http://localhost:8766/site/index.html no navegador.
