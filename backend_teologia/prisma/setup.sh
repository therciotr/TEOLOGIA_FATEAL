
#!/bin/bash

echo "🚀 Iniciando configuração automática do banco de dados MariaDB..."

# Configurações
DB_USER="trsystemas_teologia"
DB_PASS="Fateal2025#@Teologia"
DB_NAME="trsystemas_teologia"
DB_HOST="localhost"

# Executando schema.sql
echo "✅ Aplicando schema.sql..."
mysql -u $DB_USER -p"$DB_PASS" -h $DB_HOST $DB_NAME < prisma/schema.sql

# Executando seeds.sql
echo "✅ Aplicando seeds.sql..."
mysql -u $DB_USER -p"$DB_PASS" -h $DB_HOST $DB_NAME < prisma/seeds.sql

echo "✅ Configuração do banco concluída com sucesso!"
