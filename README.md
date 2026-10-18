# academiaangatu
Repositório pra desenvolver os sites de venda da Academia Angatu

## Estrutura

| Pasta | O que tem |
|---|---|
| `design-system/` | Tokens e componentes extraídos do angatumedicinal.org + `style-guide.html` para visualizar |
| `site/` | Landing page do curso *Introdução à Prescrição de Cannabis Medicinal* (tema escuro) |
| `site/js/content.js` | Conteúdo editável: professores, módulos/aulas e URL de captura de leads |
| `integrations/google-sheets/` | Apps Script que grava os leads da pré-venda numa planilha |
| `publish/` | Página raiz do subdomínio (redireciona para a pré-venda) |
| `.github/workflows/pages.yml` | Publica o site no GitHub Pages a cada push |

## Como o site vai ao ar

O site fica em **https://academia.angatumedicinal.org**, publicado pelo GitHub Pages (gratuito).

| Endereço | Conteúdo |
|---|---|
| `/` | Redireciona para `/pre-venda/` (no futuro, pode virar a home da Academia) |
| `/pre-venda/` | Landing page da pré-venda (`site/`) |

**Para publicar uma mudança:** faça commit e push para `main`. O GitHub Actions publica em cerca de 1 minuto. Quando mudar CSS ou JS, aumente o `?v=` desses arquivos no `site/index.html`, para os visitantes não verem a versão antiga em cache.

O domínio é configurado na Locaweb com um registro CNAME: `academia` → `dehrolla.github.io`.

## Pré-visualizar localmente

```bash
python3 -m http.server 8766
```

Depois, abra http://localhost:8766/site/index.html no navegador.
