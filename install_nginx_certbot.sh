#!/bin/bash
DOMAIN="fateal.trsystemas.com.br"
BACKEND_PORT=3000
echo "Instalando NGINX e Certbot..."
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"
sudo bash -c "cat > $NGINX_CONF" <<EOL
server {
    listen 80;
    server_name $DOMAIN;
    location / {
        proxy_pass http://localhost:$BACKEND_PORT/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
    location /api/ {
        proxy_pass http://localhost:$BACKEND_PORT/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL
sudo ln -s $NGINX_CONF /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
echo "Obtendo certificado SSL com Certbot..."
sudo certbot --nginx -d $DOMAIN
echo "Configuração concluída com sucesso!"
