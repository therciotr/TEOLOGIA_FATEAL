#!/bin/bash

### === VARIÁVEIS DO USUÁRIO === ###
PROJECT_NAME="backend_teologia"
DOMAIN="fateal.trsystemas.com.br"
APP_PORT=3000
REPO_DIR="/var/www/$PROJECT_NAME"

### === ATUALIZA SISTEMA === ###
echo "🔄 Atualizando pacotes..."
apt update && apt upgrade -y

### === INSTALA NODE, NPM, GIT === ###
echo "⚙️ Instalando Node.js e ferramentas..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs git
npm install -g pm2

### === INSTALA MYSQL CLIENT === ###
echo "🛠️ Instalando MySQL Client..."
apt install -y mysql-client

### === INSTALA NGINX E CERTBOT === ###
echo "🌐 Instalando NGINX e Certbot..."
apt install -y nginx certbot python3-certbot-nginx

### === CLONA O PROJETO (AJUSTAR SE NECESSÁRIO) === ###
echo "📦 Clonando projeto..."
mkdir -p $REPO_DIR
cd $REPO_DIR
# git clone OU scp os arquivos manualmente para $REPO_DIR

### === INSTALA DEPENDÊNCIAS DO PROJETO === ###
echo "📦 Instalando dependências do projeto..."
npm install

### === BUILD DO PROJETO === ###
echo "🏗️  Buildando projeto..."
npm run build

### === RODA COM PM2 === ###
echo "🚀 Rodando com PM2..."
pm install -g pm2
pm run build
pm run start:prod
pm run start &
pm2 start dist/main.js --name $PROJECT_NAME
pm2 save
pm2 startup

### === CONFIGURA NGINX === ###
echo "🌐 Configurando NGINX..."
cat > /etc/nginx/sites-available/$PROJECT_NAME <<EOL
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

ln -s /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

### === INSTALA SSL COM CERTBOT === ###
echo "🔐 Instalando SSL com Let's Encrypt..."
certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m suporte@trsystemas.com.br

### === FIM === ###
echo "✅ Deploy concluído! Acesse: https://$DOMAIN"