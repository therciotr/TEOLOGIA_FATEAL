#!/bin/bash

echo "🚀 Iniciando deploy automático do Frontend Teologia..."

# Caminho local do build
DIST_PATH="./dist"

# Caminho no servidor via FTP/SFTP
REMOTE_USER="trsystemas"
REMOTE_HOST="ftp.trsystemas.com.br"
REMOTE_PATH="domains/fateal.trsystemas.com.br/public_html/"

# Confirma se a pasta dist existe
if [ ! -d "$DIST_PATH" ]; then
  echo "❌ Erro: Pasta 'dist/' não encontrada. Execute 'npm run build' antes."
  exit 1
fi

echo "✅ Pasta 'dist/' encontrada. Preparando para enviar..."

# Sincroniza via rsync sobre SSH
rsync -avz --delete "$DIST_PATH/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

echo "✅ Deploy concluído com sucesso!"
echo "✅ Acesse: https://trsystemas.com.br"

