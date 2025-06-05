
#!/bin/bash
echo "🚀 Iniciando deploy de produção do TEOLOGIA_FATEAL..."
docker-compose up --build -d
echo "✅ Todos os serviços foram iniciados!"
docker ps
