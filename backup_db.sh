#!/bin/bash
echo "🗄️ Iniciando backup do banco de dados Teologia..."
BACKUP_DIR="./backup"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/teologia_db_backup_$TIMESTAMP.sql"
mkdir -p $BACKUP_DIR
docker exec -t teologia_postgres pg_dump -U teologia_user teologia_db > $BACKUP_FILE
echo "✅ Backup criado em: $BACKUP_FILE"
