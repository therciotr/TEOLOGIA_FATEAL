# Usa a imagem oficial Node.js como base
FROM node:20-alpine AS builder

# Define diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependências para otimizar o cache do Docker
COPY package*.json ./

# Instala apenas as dependências de produção
RUN npm install --production

# Copia o restante do código para o diretório de trabalho
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Segunda etapa: cria uma imagem mais leve apenas com os arquivos necessários
FROM node:20-alpine

# Define diretório de trabalho no container
WORKDIR /app

# Copia apenas a pasta "dist" gerada pelo build e os arquivos necessários para rodar em produção
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Expõe a porta padrão do NestJS
EXPOSE 3000

# Define a variável de ambiente de produção
ENV NODE_ENV=production

# Comando para iniciar o backend
CMD ["node", "dist/main.js"]
