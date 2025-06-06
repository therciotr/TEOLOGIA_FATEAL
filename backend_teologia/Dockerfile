# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar OpenSSL para compatibilidade do Prisma
RUN apk update && apk add --no-cache openssl

# Copiar arquivos essenciais para o build
COPY package*.json ./
COPY tsconfig.json ./

# Copiar a pasta prisma (se existir)
COPY prisma ./prisma

# Copiar a pasta src
COPY src ./src

# Instalar dependências
RUN npm install

# Compilar o projeto
RUN npm run build

# Etapa 2: Imagem final para produção
FROM node:20-alpine

WORKDIR /app

# Instalar OpenSSL também no ambiente final para que o Prisma funcione em produção
RUN apk update && apk add --no-cache openssl

# Copiar apenas o build final e as dependências necessárias
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Variáveis de ambiente padrão
ENV NODE_ENV=production

EXPOSE 3000

# Comando padrão de execução
CMD ["node", "dist/main.js"]
