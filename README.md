# academiaangatu
Repositório pra desenvolver os sites de venda da Academia Angatu

## Estrutura

| Pasta | O que tem |
|---|---|
| `design-system/` | Tokens e componentes extraídos do angatumedicinal.org + `style-guide.html` para visualizar |
| `site/` | Landing page do curso *Introdução à Prescrição de Cannabis Medicinal* (tema escuro) |
| `site/js/content.js` | Conteúdo editável: professores, módulos/aulas e URL de captura de leads |
| `integrations/google-sheets/` | Apps Script que grava os leads da pré-venda numa planilha |
| `publish/` | Página de fallback para endereços inexistentes (redireciona para a raiz) |
| `.github/workflows/pages.yml` | Publica o site no GitHub Pages a cada push |

## Como o site vai ao ar

O site fica em **https://academia.angatumedicinal.org**, publicado pelo GitHub Pages (gratuito).

| Endereço | Conteúdo |
|---|---|
| `/` | Página de vendas do curso (`site/`), sem caminho adicional |
| `/pre-venda/` | Mesma página, preservada para os links já divulgados |

**Para publicar uma mudança:** faça commit e push para `main`. O GitHub Actions publica em cerca de 1 minuto. Quando mudar CSS ou JS, aumente o `?v=` desses arquivos no `site/index.html`, para os visitantes não verem a versão antiga em cache.

O domínio é configurado na Locaweb com um registro CNAME: `academia` → `dehrolla.github.io`.

Para o endereço adicional `www.academia.angatumedicinal.org`, configurar outro CNAME na mesma zona: `www.academia` → `dehrolla.github.io`. O domínio principal do GitHub Pages continua sendo `academia.angatumedicinal.org`; verificar a resolução DNS, o redirecionamento e a emissão do certificado para o endereço com `www` antes de considerá-lo disponível via HTTPS.

## Google Analytics

A página usa o contêiner Google Tag Manager `GTM-K3DT2HZV`, configurado com o fluxo GA4 `G-EYWLB626MD` (propriedade `565945045`). O código está em `site/index.html`, compartilhado pela raiz e por `/pre-venda/`.

A configuração da tag é gerenciada e publicada no Tag Manager. Não adicionar uma segunda instalação direta de GA4 ao HTML, para evitar duplicação de visitas. A instalação no site mede o acesso à página; compras concluídas no checkout externo dependem da integração da Hotmart.

## Pré-visualizar localmente

```bash
python3 -m http.server 8766
```

Depois, abra http://localhost:8766/site/index.html no navegador.
