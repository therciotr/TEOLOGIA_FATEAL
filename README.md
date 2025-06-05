# 🚀 Backend Teologia FATEAL

Este projeto é o backend do sistema **Teologia FATEAL**, desenvolvido com **NestJS**, **Prisma** e **MySQL/MariaDB**. Ele fornece APIs para gerenciar **alunos**, **mensalidades**, **pagamentos** e **documentos**, com suporte para múltiplos bancos de pagamento (Banco do Brasil, Mercado Pago, Bradesco, Santander, Caixa e Sicredi).

---

## 🎯 Funcionalidades principais

✅ CRUD de Alunos com upload de foto 3x4  
✅ CRUD de Mensalidades e geração de mensalidades  
✅ Processamento de Pagamentos com integração a bancos reais  
✅ Upload e gerenciamento de Documentos vinculados aos alunos  
✅ Autenticação JWT (padrão para APIs REST)  
✅ API de geração de **comprovante em PDF**  
✅ Documentação interativa com **Swagger**  

---

## 🛠️ Tecnologias utilizadas

- **NestJS** - Framework principal  
- **Prisma** - ORM e migrations  
- **MySQL/MariaDB** - Banco de dados  
- **Swagger** - Documentação interativa  
- **PDFKit** - Geração de comprovantes PDF  
- **Multer** - Upload de arquivos  
- **JWT** - Autenticação e autorização  
- **Docker** - Gerenciamento de containers  
- **Class-validator** - Validação de dados  
- **Eslint** e **Prettier** - Padrão de código

---

## 📁 Estrutura do projeto

```
backend_teologia/
├── src/
│   ├── alunos/
│   ├── mensalidades/
│   ├── pagamentos/
│   ├── prisma/
│   ├── common/
│   ├── main.ts
│   ├── app.module.ts
│   ├── ...
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── dist/ (gerado no build)
├── docker-compose.yml
├── .env.example
├── README.md
└── package.json
```

---

## ⚙️ Instalação e uso

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/backend_teologia.git
cd backend_teologia

# Instale as dependências
npm install

# Configure o arquivo .env (baseado no .env.example)
cp .env.example .env

# Gere o Prisma Client e realize as migrações
npx prisma generate
npx prisma migrate dev

# Execute em ambiente de desenvolvimento
npm run start:dev

# Execute em produção
npm run build
npm run start:prod
```

---

## 🐳 Docker Compose

Para rodar o projeto com Docker e banco de dados MariaDB/MySQL:

```bash
docker-compose up --build
```

- **Atenção:** As credenciais de banco de dados estão em `.env` e também no `docker-compose.yml`. Mantenha essas informações seguras.

---

## ⚙️ Variáveis de ambiente (.env.example)

```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/trsystemas_teologia"
JWT_SECRET="sua-chave-secreta-aqui"
PORT=3000
```

> 💡 Copie o arquivo `.env.example` para `.env` e edite com suas credenciais reais.

---

## 📚 Documentação

Acesse a documentação interativa gerada pelo Swagger:

```
http://localhost:3000/api
```

---

## 🤝 Contribuição

Sinta-se à vontade para enviar pull requests ou abrir issues para sugerir melhorias ou reportar problemas.

---

## 💡 Contato

- Nome: Thercio José Silva  
- Email: thercio@trtecnologias.com.br  
- Projeto: **Teologia FATEAL**  

---

⚡ Projeto pronto para produção, com arquitetura modular e escalável.  
🚀 **Vamos à frente!**  
