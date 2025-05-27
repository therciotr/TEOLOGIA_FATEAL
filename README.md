
# 📚 TEOLOGIA_FATEAL

**Sistema completo para gestão acadêmica da Faculdade FATEAL**, com:

- Backend em **NestJS** + **Prisma** (MySQL).  
- Frontend em **React** + **Vite**.  
- Aplicativo Mobile em **Flutter**.  
- Monitoramento com **Prometheus** e **Grafana**.  
- Logs centralizados com **ELK Stack**.  
- Deploy e automação com **Docker Compose** e **GitHub Actions**.

## 🚀 Tecnologias Utilizadas

✅ NestJS + Prisma  
✅ MySQL  
✅ React + Vite  
✅ Flutter  
✅ Prometheus + Grafana  
✅ ELK Stack (Elasticsearch, Logstash, Kibana)  
✅ Docker + Docker Compose  
✅ Traefik (balanceamento)  
✅ GitHub Actions (CI/CD)  

## 🏗️ Pré-requisitos

✅ Docker e Docker Compose instalados.  
✅ Node.js (versão LTS).  
✅ Flutter SDK.  
✅ MySQL instalado e configurado.  

## 📦 Instalação e configuração

### ✅ 1. Clonar o repositório

git clone https://github.com/seuusuario/TEOLOGIA_FATEAL.git
cd TEOLOGIA_FATEAL

### ✅ 2. Configurar variáveis de ambiente

**Backend (`backend_teologia/.env`):**

PORT=3000
DATABASE_URL="mysql://trsystemas_teologia:Fateal2025#@Teologia@localhost:3306/trsystemas_teologia"
JWT_SECRET=supersecretkey
PRISMA_LOG=info
NODE_ENV=development

**Mobile (`mobile_teologia/.env`):**

API_URL=https://fateal.trsystemas.com.br/api

### ✅ 3. Criar e popular o banco de dados

mysql -u trsystemas_teologia -p trsystemas_teologia < schema.sql
mysql -u trsystemas_teologia -p trsystemas_teologia < seeds.sql

### ✅ 4. Gerar Prisma Client

cd backend_teologia
npx prisma generate
npx prisma db pull

### ✅ 5. Subir containers com Docker Compose

docker-compose up --build -d

## 💻 Rodando o projeto

### ✅ Backend (NestJS)

cd backend_teologia
npm install
npm run start:dev

➡️ API: http://localhost:3000/api  
➡️ Swagger: http://localhost:3000/api-docs  

### ✅ Frontend (React + Vite)

cd frontend_teologia
npm install
npm run dev

➡️ Frontend: http://localhost:5173  

### ✅ Mobile (Flutter)

cd mobile_teologia
flutter pub get
flutter run

➡️ Mobile consome API via `API_URL`.

## 📊 Monitoramento e Logs

| Serviço          | URL                          |
|------------------|------------------------------|
| Prometheus       | http://localhost:9090        |
| Grafana          | http://localhost:3001        |
| Kibana           | http://localhost:5601        |
| Traefik          | http://localhost:8080/dashboard |

## 🛠️ Scripts importantes

| Script                      | Função                                      |
|----------------------------- |---------------------------------------------|
| deploy_all.sh               | Deploy completo (containers, NGINX, Flutter) |
| backup_db.sh                | Backup do banco de dados                    |
| rollback.sh                 | Rollback do banco de dados                  |
| upload_backup_s3.sh         | Envio de backup para Amazon S3              |
| notify_deploy.sh            | Notificação via Telegram e E-mail            |
| build_flutter.sh            | Geração de build Flutter (APK)               |
| install_nginx_certbot.sh    | Instalação de NGINX + SSL com Certbot        |

## 📦 CI/CD - GitHub Actions

Automação configurada em:

.github/workflows/deploy.yml

✅ Ao fazer `git push` para a `main`, dispara:

- Deploy via Docker Compose  
- Backup automático  
- Build Flutter  

## 🧪 Testes

✅ Backend com Jest:  

cd backend_teologia
npm run test

## 📁 Estrutura do projeto

TEOLOGIA_FATEAL/
├── backend_teologia/        → Backend NestJS + Prisma
├── frontend_teologia/       → Frontend React + Vite
├── mobile_teologia/         → App Flutter
├── monitoring/              → Prometheus config
├── .github/workflows/       → CI/CD GitHub Actions
├── docker-compose.yml       → Orquestração completa
├── Scripts (.sh)            → Deploy, backup, notificações
├── nginx.conf               → Configuração NGINX
├── prometheus.yml           → Configuração Prometheus
├── logstash.conf            → Configuração Logstash (ELK)

## 🛡️ Segurança

✅ Variáveis sensíveis em `.env` (não versionar!).  
✅ SSL configurado via `install_nginx_certbot.sh`.  
✅ Autenticação via JWT no backend.  

## ❓ Suporte e contribuição

✅ Forks e Pull Requests são bem-vindos!  
✅ Para reportar problemas, abra uma **Issue**.  

## ✨ Autores

- 👤 Thercio  
- 👥 Equipe TR TECNOLOGIAS  

## ✅ Licença

Este projeto é licenciado sob os termos da **MIT License**.

## ✅ Pronto para o deploy?

./deploy_all.sh

Bora transformar a educação com tecnologia! 🚀📚
