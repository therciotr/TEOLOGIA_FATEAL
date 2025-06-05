
# 📘 Backend - TEOLOGIA_FATEAL

Este é o backend do sistema TEOLOGIA FATEAL, desenvolvido em **NestJS** com suporte a Swagger, Prisma e PDFKit.

---

## ✅ Requisitos

- Node.js 18+
- npm
- Docker (opcional para PostgreSQL)

---

## 🚀 Instalação e Execução

```bash
# Acesse a pasta
cd backend_teologia

# Instale as dependências
npm install

# Crie o banco de dados (se necessário)
npx prisma generate
npx prisma migrate dev

# Rode o servidor em modo desenvolvimento
npm run start:dev

# ou modo produção
npm run build
npm run start:prod
```

---

## 📚 Documentação Swagger

Após o backend estar rodando, acesse:

```
http://localhost:3000/api
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` com:

```
DATABASE_URL="mysql://user:password@localhost:3306/trsystemas_teologia"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

---

## 🧪 Testes

```bash
npm run test
```

---

## ✍️ Autor

TR TECNOLOGIAS - Projeto Teológico Modernizado.
