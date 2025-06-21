
# 📚 Teologia FATEAL IEAD – Sistema Completo

Projeto completo (Backend + Frontend + Mobile) para o sistema **Teologia FATEAL**, com autenticação, gerenciamento de alunos, mensalidades, documentos, pagamentos e notificações. Integrado ao **Firebase**, **MySQL/MariaDB** e APIs REST modernas.

---

## 🚀 Tecnologias Utilizadas

- **Backend:** NestJS + Prisma + MySQL
- **Frontend:** React (Vite) + TailwindCSS
- **Mobile:** Flutter + Firebase
- **Infra:** Docker, Docker Compose, Firebase Auth, Swagger

---

## 🧱 Estrutura do Projeto

```
teologia_fateal/
├── backend_teologia/       # API REST em NestJS
├── painel_web/             # Frontend em React
├── mobile_app/             # App mobile em Flutter
├── database/               # Arquivos SQL (schema.sql, seeds.sql)
├── monitoring/             # prometheus.yml
├── docker-compose.yml      # Containerização total
└── README.md               # Este documento
```

---

## ⚙️ Configuração do Backend (NestJS)

```bash
# 1. Entre na pasta do backend
cd backend_teologia

# 2. Instale as dependências
npm install

# 3. Copie e edite o arquivo de variáveis
cp .env.example .env

# 4. Gere o Prisma Client
npx prisma generate

# 5. Realize a migração e crie o banco
npx prisma migrate dev --name init

# 6. Rode em modo desenvolvimento
npm run start:dev
```

> 🔐 Acesse a documentação da API: http://localhost:3000/api

---

## 💻 Configuração do Frontend (React)

```bash
# 1. Vá até a pasta painel_web
cd painel_web

# 2. Instale as dependências
npm install

# 3. Configure as variáveis em .env
cp .env.example .env

# 4. Inicie o frontend
npm run dev
```

> 🌐 Acesse: http://localhost:5173

---

## 📱 Configuração do App Mobile (Flutter)

```bash
# 1. Entre na pasta do app
cd mobile_app

# 2. Instale as dependências do Flutter
flutter pub get

# 3. Configure o Firebase
flutterfire configure

# 4. Rode o app
flutter run
```

> 🛑 Certifique-se que o arquivo `firebase_options.dart` foi gerado corretamente.

---

## 🐳 Rodando com Docker

```bash
# Do diretório raiz
docker-compose up --build
```

> Isso sobe o backend + banco de dados MySQL. O painel web e o app devem ser executados separadamente.

---

## 🧪 Testes e Monitoramento

- Prometheus configurado via `monitoring/prometheus.yml`
- Testes unitários no backend com `npm run test`
- Swagger acessível via `/api` no backend

---

## 📂 Variáveis de Ambiente (Exemplo)

### `.env` do Backend

```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/teologia"
JWT_SECRET="chave-super-secreta"
PORT=3000
```

### `.env` do Frontend

```bash
VITE_API_URL=http://localhost:3000
```

---

## 📦 Banco de Dados

- Arquivo `schema.sql`: estrutura completa com histórico, logs, notificações
- Arquivo `seeds.sql`: dados iniciais (usuários, planos, alunos, documentos)
- Compatível com **MySQL** e **MariaDB**

---

## 🔐 Firebase

- Autenticação via Firebase Auth
- Configurações em `firebase.json`
- App mobile usa `firebase_options.dart`
- Uploads de documentos armazenados via Firebase Storage (opcional)

---

## 📚 Documentação

- API Swagger: http://localhost:3000/api
- Endpoints REST bem definidos
- Upload via Multer (foto e documentos)

---

## 🧠 Observações Finais

- As senhas do seed estão em **texto plano** — use `bcrypt` ou `argon2` em produção.
- Utilize variáveis de ambiente seguras em produção.
- Backup do banco é recomendado com frequência.

---

## ✉️ Contato

- Autor: Thercio José Silva  
- Email: [thercio@trtecnologias.com.br](mailto:thercio@trtecnologias.com.br)  
- Projeto: **Teologia FATEAL**

---

⚡ Projeto completo, modular e pronto para escalar.  
🚀 Que a jornada comece com excelência!
Deploy automático testado em Fri 20 Jun 2025 11:08:01 PM -03
