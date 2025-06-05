
#!/bin/bash
echo "🚀 Instalando dependências..."
npm install --save @nestjs/swagger pdfkit
npm install --save-dev @types/pdfkit

echo "🚀 Gerando Prisma Client..."
npx prisma generate

echo "🚀 Fazendo build..."
npm run build

echo "🚀 Iniciando aplicação..."
npm run start:prod
