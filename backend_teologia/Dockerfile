# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json e package-lock.json para cache mais eficiente
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar o restante do código-fonte
COPY . .

# Compilar o projeto para produção
RUN npm run build

# Etapa 2: Imagem final para produção
FROM node:20-alpine

WORKDIR /app

# Copiar apenas o diretório dist (código compilado) e dependências necessárias
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Variáveis de ambiente padrão (opcional)
ENV NODE_ENV=production

# Expor a porta padrão do NestJS
EXPOSE 3000

# Comando padrão de execução
CMD ["node", "dist/main.js"]
