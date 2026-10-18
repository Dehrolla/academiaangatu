# Publicar a pré-venda no Webflow

Endereço final: **https://www.angatumedicinal.org/academia/pre-venda**

Antes, confira se os arquivos estão no ar: https://dehrolla.github.io/academiaangatu/site/css/academia.css deve abrir um arquivo de CSS.

## 1. Criar a página

1. No Webflow Designer, abra o painel **Pages** (ícone de folha, à esquerda).
2. Clique no ícone de **pasta** para criar uma pasta. Nome: `Academia`, slug: `academia`.
3. Dentro dessa pasta, clique no ícone de **página** para criar uma página. Nome: `Pré-venda`, slug: `pre-venda`.

## 2. Configurações da página

Na engrenagem da página nova (**Page settings**):

- **SEO**
  - **Title:** `Introdução à Prescrição de Cannabis Medicinal | Academia Angatu`
  - **Meta description:** `Curso online e direto ao ponto para profissionais de saúde que querem começar ou aperfeiçoar a prescrição de cannabis medicinal. 6 módulos, cerca de 6h, com médicos que prescrevem e ensinam.`
- **Open Graph:** use o mesmo título e a mesma descrição. Se quiser, envie uma imagem de 1200×630 para o compartilhamento no WhatsApp e nas redes.
- **Custom code**
  - **Inside `<head>` tag:** cole todo o conteúdo de [`1-head.html`](1-head.html).
  - **Before `</body>` tag:** cole todo o conteúdo de [`3-footer.html`](3-footer.html).

Clique em **Save**.

## 3. Conteúdo

1. Abra a página no Designer. Ela deve estar vazia: **não** adicione o menu (navbar) nem o rodapé do site, porque a página já tem os dela.
2. No painel **Add** (+), arraste um **Code Embed** para dentro do **Body**.
3. Cole todo o conteúdo de [`2-embed.html`](2-embed.html) e clique em **Save & Close**.
4. Selecione o **Body** e confira se ele está **sem classe**.

No Designer, o bloco aparece sem estilo, porque o código personalizado não roda no editor. Isso é normal.

## 4. Publicar

Clique em **Publish** e marque o domínio `angatumedicinal.org`. Depois, abra https://www.angatumedicinal.org/academia/pre-venda e teste o formulário.

### Opcional: redirecionar /academia

A pasta `/academia` não tem página própria. Para quem digitar só esse endereço, crie um redirecionamento em **Site settings → Publishing → 301 redirects**:

- **Old path:** `/academia`
- **Redirect to:** `/academia/pre-venda`

## Atualizações futuras

| O que mudou | O que fazer no Webflow |
|---|---|
| Professores, módulos, cores, layout, formulário (`content.js`, CSS, JS, imagens) | **Nada.** Basta fazer o push para o GitHub; atualiza sozinho em até cerca de 10 minutos. |
| Textos fixos ou estrutura da página (`site/index.html`) | Rodar `python3 tools/build_webflow.py`, colar o novo `2-embed.html` no Code Embed e clicar em **Publish**. |
