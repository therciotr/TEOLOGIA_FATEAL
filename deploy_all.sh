#!/bin/bash
echo "🚀 Iniciando deploy completo do sistema Teologia FATEAL..."
docker-compose up --build -d
chmod +x install_nginx_certbot.sh
./install_nginx_certbot.sh
chmod +x build_flutter.sh
./build_flutter.sh
echo "✅ Deploy completo realizado com sucesso!"
