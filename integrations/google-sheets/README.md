# Leads da pré-venda → Google Sheets

O formulário da landing page envia **nome, e-mail e WhatsApp** para um Google Apps Script, que grava uma linha por lead numa planilha sua. Não tem custo e não precisa de servidor.

Cada linha registra: Data/hora · Nome · E-mail · WhatsApp · Origem · Página. A coluna Origem mostra de qual formulário veio o lead: `pre-venda-497-hero` (topo da página) ou `pre-venda-497` (seção de preços).

## Configuração (uns 5 minutos, uma vez só)

1. **Crie a planilha.** Em [sheets.new](https://sheets.new), dê um nome, por exemplo "Academia Angatu — Leads". Use a conta Google que vai ser dona dos dados (de preferência a da Angatu, não uma pessoal).
2. **Abra o editor de script.** Na planilha, vá em **Extensões → Apps Script**.
   - **Deu erro ao abrir?** Quase sempre é porque há mais de uma conta Google logada no navegador. Nesse caso, abra [script.google.com](https://script.google.com) logado só com a conta dona da planilha (uma janela anônima ajuda) e crie um **Novo projeto**. O script funciona do mesmo jeito, porque localiza a planilha pelo `SPREADSHEET_ID` no topo do `Code.gs`. Se trocar de planilha, atualize esse ID.
3. **Cole o código.** Apague o conteúdo de `Código.gs` e cole todo o conteúdo de [`Code.gs`](Code.gs). Salve (ícone de disquete).
4. **Publique como App da Web.** Clique em **Implantar → Nova implantação**. Na engrenagem, escolha **App da Web** e preencha:
   - **Executar como:** Eu (sua conta)
   - **Quem pode acessar:** Qualquer pessoa

   Clique em **Implantar** e autorize o acesso à planilha. O Google pode mostrar um aviso de "app não verificado": clique em **Avançado → Acessar (não seguro)**. O app é seu, então isso é esperado.
5. **Copie a URL.** Ela termina em `/exec`.
6. **Cole no site.** Em [`site/js/content.js`](../../site/js/content.js), cole a URL entre as aspas de `leadEndpoint`. Ela vale para todos os formulários da página (o do topo e o da seção de preços):

   ```js
   leadEndpoint: "https://script.google.com/macros/s/XXXX/exec",
   ```

7. **Teste.** Abra a URL `/exec` no navegador: deve aparecer `{"ok":true,"status":"online"}`. Depois envie o formulário do site. A aba **"Leads pré-venda"** é criada sozinha no primeiro envio.

## Bom saber

- **Alterou o `Code.gs`?** Vá em **Implantar → Gerenciar implantações → editar (lápis) → Versão: Nova versão**. Assim a URL continua a mesma. Uma "Nova implantação" geraria uma URL nova.
- **"Qualquer pessoa" é seguro?** Isso só permite *enviar* dados para o script. Ninguém consegue ler a planilha por essa URL; ela continua privada.
- **Proteções:** o script valida os campos de novo no servidor, descarta envios de robôs (campo invisível `website`) e impede que um texto vire fórmula na planilha.
- **LGPD:** a planilha guarda dados pessoais. Compartilhe só com quem precisa e mantenha o aviso de consentimento que está abaixo do botão do formulário.
- **Se o envio falhar,** o site mostra "Não foi possível enviar agora" e registra o erro no console do navegador. A causa mais comum é a URL errada ou o acesso diferente de "Qualquer pessoa".
