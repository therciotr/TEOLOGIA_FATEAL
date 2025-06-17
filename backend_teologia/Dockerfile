# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar OpenSSL para compatibilidade do Prisma
RUN apk add --no-cache openssl

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências (ci é mais seguro para builds)
RUN npm ci

# Copiar arquivos de projeto
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Gerar Prisma Client (⚠️ Essencial!)
RUN npx prisma generate

# Compilar o projeto
RUN npm run build

# Etapa 2: Imagem final para produção
FROM node:20-alpine

WORKDIR /app

# Instalar OpenSSL (necessário para Prisma em runtime)
RUN apk add --no-cache openssl

# Copiar build e dependências
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# (Opcional) Copiar o .env de produção diretamente
# COPY .env.production .env

# Variáveis de ambiente padrão
ENV NODE_ENV=production

# Porta da API NestJS
EXPOSE 3000

# Comando padrão
CMD ["node", "dist/main.js"]
