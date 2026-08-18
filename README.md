# Web Almoxarifado

## Descricao do projeto

Web Almoxarifado e uma aplicacao full-stack para gestao de itens de almoxarifado. O sistema permite cadastrar usuarios, autenticar acesso, consultar itens internos, adicionar novos componentes ao estoque, editar dados cadastrados, excluir itens e atualizar precos por meio de consulta a distribuidor externo.

O projeto foi desenvolvido como projeto final da TripleTen, integrando front-end em React, back-end em Node.js/Express, banco de dados MongoDB e API externa da TME.

## Funcionalidades

- Cadastro de usuario.
- Login e logout com JWT.
- Persistencia do token no `localStorage`.
- Validacao instantanea dos formularios de login e cadastro.
- Rota protegida para acesso a pagina de pesquisa.
- Contexto global `CurrentUserContext` para armazenar o usuario atual.
- Listagem dos itens cadastrados no almoxarifado.
- Pesquisa automatica por nome, fabricante, categoria, localizacao ou part number.
- Consulta a distribuidor externo quando o item nao existe no almoxarifado.
- Adicao de item externo ao almoxarifado.
- Edicao de localizacao, quantidade, quantidade minima, preco e imagem do item.
- Exclusao de item com popup de confirmacao.
- Atualizacao de preco por consulta a API da TME via back-end.
- Popup de feedback para sucesso ou erro na atualizacao de preco.
- Preloader durante consultas externas.
- Tratamento de erros de requisicao.
- Layout responsivo para desktop, tablet e celular.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- React Router
- Context API
- CSS com metodologia BEM
- Fetch API
- localStorage
- ESLint

## Back-end

O front-end se comunica com a API propria do projeto:

```text
http://localhost:3000
```

Em desenvolvimento local, essa URL pode ser configurada em um arquivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

No deploy, essa variavel deve apontar para o dominio publico da API.

Rotas utilizadas pelo front-end:

```text
POST /signup
POST /signin
GET /users/me
GET /items
POST /items
PATCH /items/:itemId
DELETE /items/:itemId
GET /api/suppliers/tme/search?query=...
```

A integracao com a TME e feita pelo back-end para proteger token e segredo da API. Nenhuma credencial sensivel e armazenada no front-end.

## Como executar localmente

Antes de iniciar o front-end, execute tambem o back-end e mantenha o MongoDB ativo.

Instale as dependencias:

```bash
npm install
```

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Se o PowerShell bloquear scripts no Windows, use:

```powershell
npm.cmd install
npm.cmd run dev
```

Endereco local padrao:

```text
http://localhost:5173/
```

## Scripts disponiveis

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Estrutura principal

```text
src/
  blocks/
  components/
  contexts/
  images/
  utils/
```

Arquivos importantes:

```text
src/utils/api.js
src/contexts/CurrentUserContext.jsx
src/components/ProtectedRoute/ProtectedRoute.jsx
src/components/AuthPopup/AuthPopup.jsx
src/components/Search/Search.jsx
```

## Seguranca

- O token JWT e salvo no `localStorage`.
- Rotas privadas exigem autenticacao.
- As credenciais da TME ficam apenas no back-end, em variaveis de ambiente.
- O arquivo `.env` nao deve ser enviado ao GitHub.

## Deploy

O deploy full-stack foi realizado com front-end e back-end acessiveis por dominio com HTTPS, conforme orientacao da TripleTen para a etapa final.

Link do front-end:

```text
https://web-almoxarifado.mooo.com
```

Link da API:

```text
https://api.web-almoxarifado.mooo.com
```

## Branch da etapa final

```text
stage-final
```

## Status

Projeto desenvolvido para a Etapa Final do projeto full-stack da TripleTen.
