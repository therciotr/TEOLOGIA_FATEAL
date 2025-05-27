#!/bin/bash
echo "⏪ Iniciando rollback do sistema Teologia FATEAL..."
docker-compose down
BACKUP_DIR="./backup"
LATEST_BACKUP=$(ls -t $BACKUP_DIR | head -n 1)
if [ -z "$LATEST_BACKUP" ]; then
  echo "⚠️ Nenhum backup encontrado. Rollback não pode ser realizado."
  exit 1
fi
echo "➡️ Restaurando: $LATEST_BACKUP"
cat "$BACKUP_DIR/$LATEST_BACKUP" | docker exec -i teologia_postgres psql -U teologia_user teologia_db
echo "✅ Rollback realizado com sucesso!"
