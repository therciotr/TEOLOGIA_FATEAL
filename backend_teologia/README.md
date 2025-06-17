# 📘 Backend - TEOLOGIA_FATEAL

Sistema backend desenvolvido com **NestJS**, **Prisma ORM**, **MySQL** e **Firebase Admin SDK**. Este backend fornece a base para o sistema TEOLOGIA FATEAL, integrando com painel web (React), app mobile (Flutter) e banco de dados relacional.

---

## ✅ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL/MariaDB](https://www.mysql.com/)
- [Firebase Admin SDK](https://firebase.google.com/)
- [Docker](https://www.docker.com/)
- [Swagger (Documentação API)](http://localhost:3000/api)

---

## 🚀 Requisitos

- Node.js 18+
- Docker e Docker Compose
- Firebase Admin SDK (arquivo `.json`)
- Prisma CLI (`npm install -g prisma`)
- MySQL ou MariaDB

---

## 📁 Estrutura do Projeto

```
backend_teologia/
├── prisma/
│   ├── schema.prisma
│   ├── seeds.sql
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── modules/
│   └── common/
├── .env
├── Dockerfile
├── tsconfig.json
├── package.json
```

---

## ⚙️ Variáveis de Ambiente (`.env`)

Crie o arquivo `.env` com base no exemplo abaixo:

```env
DATABASE_URL="mysql://usuario:senha@host:porta/banco"
PORT=3000
NODE_ENV=production

FIREBASE_PROJECT_ID=teologia-fateal
FIREBASE_CLIENT_EMAIL=example@teologia.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"

# Caminho local para o JSON do Firebase (caso use o arquivo no Docker)
GOOGLE_APPLICATION_CREDENTIALS=/app/secrets/firebase-service-account.json
```

---

## 🐳 Rodando com Docker

### 1. Clonar o projeto

```bash
git clone https://github.com/seuusuario/teologia_backend.git
cd teologia_backend
```

### 2. Iniciar os containers

```bash
docker-compose up -d --build
```

> 🔒 Certifique-se de ter o arquivo `firebase-service-account.json` na pasta `./secrets/`.

---

## 🧪 Inicializar o Banco de Dados

### 1. Rodar as migrações Prisma

```bash
npx prisma migrate deploy
```

### 2. Popular com dados de exemplo (modo dev)

```bash
npx prisma db seed
# ou manualmente:
mysql -u root -p teologia < prisma/seeds.sql
```

---

## 📂 Documentação da API

Após iniciar o backend, acesse:

```
http://localhost:3000/api
```

A documentação Swagger será exibida com todos os endpoints disponíveis e suas descrições.

---

## 🔐 Autenticação

- JWT Token nos headers: `Authorization: Bearer <token>`
- Integração com Firebase Authentication (admin SDK)

---

## 🧑‍💻 Scripts Úteis

```bash
# Desenvolvimento com hot-reload
npm run start:dev

# Produção
npm run build
npm run start:prod

# Testes
npm run test
```

---

## 📎 Observações

- O backend depende do banco MariaDB/MySQL rodando corretamente.
- O Prisma utiliza o `schema.prisma` para gerar as entidades e conectar ao banco.
- O Firebase Admin SDK é usado para autenticação e notificações.
- O backend se integra com o frontend (React) e mobile (Flutter).

---

## 📞 Suporte

Em caso de dúvidas, contate a equipe TR TECNOLOGIAS.
