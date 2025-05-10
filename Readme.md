
CreateUsersAPI
==============

API RESTful para gerenciamento de usuários utilizando Node.js, Express, Prisma (MongoDB) e Zod para validação de dados.

Tecnologias
-----------
- Node.js
- Express
- Prisma ORM
- MongoDB
- Zod — Validação de esquemas
- ES Modules

Como executar o projeto
-----------------------

1. Clone o repositório
   git clone https://github.com/seu-usuario/createusersapi.git
   cd createusersapi

2. Instale as dependências
   npm install

3. Configure o banco de dados
   Crie um arquivo `.env` na raiz com o conteúdo:
   DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"

4. Gere o client do Prisma
   npx prisma generate

5. Inicie o servidor
   npm run dev

Endpoints
---------
| Método | Rota                | Descrição                        |
|--------|---------------------|----------------------------------|
| GET    | /usuarios           | Lista todos os usuários          |
| GET    | /usuarios/:id       | Busca um usuário por ID          |
| POST   | /usuarios           | Cria um novo usuário             |
| PUT    | /usuarios/:id       | Atualiza os dados de um usuário |
| DELETE | /usuarios/:id       | Remove um usuário                |

Validação com Zod
-----------------
As requisições são validadas usando Zod para garantir consistência nos dados recebidos.

Estrutura do projeto
--------------------
CreateUsersAPI/
├── prisma/
├── generated/
├── src/
│   ├── routes/
│   └── server.js
├── .env
├── package.json
└── README.md

Scripts úteis
-------------
- Rodar servidor com reload automático:
  node --watch src/server.js

- Gerar client Prisma novamente (caso altere schema):
  npx prisma generate

Licença
-------
Este projeto está licenciado sob a licença MIT.
