
#!/bin/bash

echo "🛑 Parando e removendo containers..."
docker-compose down

echo "🧹 Limpando volumes..."
docker-compose down -v

echo "✅ Limpeza completa!"
