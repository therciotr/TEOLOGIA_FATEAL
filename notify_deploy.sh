#!/bin/bash
echo "📢 Enviando notificação de deploy..."

TELEGRAM_TOKEN="SEU_TELEGRAM_BOT_TOKEN"
TELEGRAM_CHAT_ID="SEU_CHAT_ID"

EMAIL_TO="seuemail@dominio.com"
EMAIL_SUBJECT="✅ Deploy Teologia FATEAL Concluído"
EMAIL_BODY="O deploy do sistema Teologia FATEAL foi realizado com sucesso em $(date)."

curl -s -X POST https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage     -d chat_id=$TELEGRAM_CHAT_ID     -d text="$EMAIL_BODY"

echo "$EMAIL_BODY" | mail -s "$EMAIL_SUBJECT" $EMAIL_TO

echo "✅ Notificações enviadas com sucesso!"
