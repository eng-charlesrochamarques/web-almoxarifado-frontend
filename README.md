# Web Almoxarifado

## Descrição do projeto

Web Almoxarifado é uma aplicação front-end em React para pesquisa e gestão inicial de itens de almoxarifado. Nesta primeira fase, o aplicativo permite pesquisar itens cadastrados localmente, consultar dados em uma API externa pública e visualizar resultados de fornecedores em uma interface preparada para evoluir para um sistema full-stack.

O projeto foi desenvolvido para a Fase 1 do projeto final da TripleTen: marcação, JSX e conexão com uma API de terceiros.

## Funcionalidades

- Página inicial com apresentação do sistema.
- Navegação entre as páginas Início e Pesquisar.
- Botões visuais de Entrar e Registrar, preparados para a etapa de autenticação.
- Pesquisa automática nos itens cadastrados no almoxarifado.
- Consulta a uma API externa quando o item não é encontrado internamente.
- Exibição de resultados internos em tabela.
- Exibição de resultados externos em tabela.
- Normalização dos dados recebidos da API externa.
- Preloader durante a consulta ao fornecedor.
- Tratamento de erros de requisição.
- Estado de nenhum resultado encontrado.
- Botão Mostrar mais para carregar mais resultados externos.
- Popup reutilizável para confirmação e simulação de adição de item ao almoxarifado.
- Persistência da última busca externa com localStorage.
- Layout responsivo para desktop, tablet e celular.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- React Router
- CSS com metodologia BEM
- Fetch API
- localStorage
- ESLint

## API externa

Nesta fase, a integração ativa usa uma API pública para demonstrar o fluxo de consulta externa sem expor credenciais no front-end.

API utilizada:

```text
https://dummyjson.com/products/search
```

Exemplos de termos para teste:

- phone
- laptop
- watch
- perfume
- shirt

O projeto também possui uma estrutura preparada para futura integração com a TME em `src/utils/tmeSupplierApi.js`. Essa integração não é chamada diretamente pelo navegador porque a API da TME exige token e segredo de aplicação.

Na próxima fase, a integração correta será feita pelo back-end, seguindo o fluxo:

```text
React -> Back-end próprio -> API da TME -> Back-end normaliza os dados -> React exibe os resultados
```

## Segurança

Nenhuma chave, token ou segredo é armazenado no front-end ou publicado no GitHub. As credenciais reais da TME serão mantidas em variáveis de ambiente no back-end durante as próximas fases do projeto.

## Como executar localmente

Clone o repositório e instale as dependências:

```bash
npm install
```

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Se o PowerShell bloquear scripts no Windows, use os comandos com `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

Endereço local padrão:

```text
http://localhost:5173/
```

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Implantação

Como este projeto continuará como uma aplicação full-stack nas próximas fases, a implantação do front-end será feita posteriormente junto com o back-end, conforme orientação da TripleTen.

Link do deploy:

```text
A ser adicionado nas próximas fases.
```

## Status da Fase 1

Branch de desenvolvimento:

```text
stage-react-api
```

Pull request:

```text
A ser aberta de stage-react-api para main.
```

## Próximas fases

Na Fase 2, o projeto deve evoluir para incluir:

- Back-end com Node.js e Express.
- Banco de dados MongoDB.
- Modelos de usuário e itens do almoxarifado.
- CRUD real de itens conectado ao banco de dados.
- Integração protegida com a API da TME.
- Variáveis de ambiente para credenciais sensíveis.

Na Fase 3, o projeto deve incluir:

- Cadastro de usuário.
- Login de usuário.
- Rotas protegidas.
- Autenticação com JWT.
- Controle de sessão no front-end.
