#!/bin/bash
echo "☁️ Iniciando envio de backup para Amazon S3..."
BACKUP_DIR="./backup"
LATEST_BACKUP=$(ls -t $BACKUP_DIR | head -n 1)
if [ -z "$LATEST_BACKUP" ]; then
  echo "⚠️ Nenhum backup encontrado para enviar."
  exit 1
fi
AWS_BUCKET="s3://teologia-backups"
AWS_PROFILE="default"
echo "➡️ Enviando: $LATEST_BACKUP para $AWS_BUCKET"
aws s3 cp "$BACKUP_DIR/$LATEST_BACKUP" "$AWS_BUCKET" --profile $AWS_PROFILE
echo "✅ Backup enviado com sucesso para S3!"
