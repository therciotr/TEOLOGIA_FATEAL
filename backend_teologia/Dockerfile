########################
# Stage 0 – deps
########################
FROM node:20-alpine AS deps

WORKDIR /app
RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma

ENV PRISMA_SKIP_POSTINSTALL_GENERATE=1
RUN npm ci
RUN npx prisma generate --schema=prisma/schema.prisma

########################
# Stage 1 – builder
########################
FROM node:20-alpine AS builder

WORKDIR /app
RUN apk add --no-cache openssl

# Copia dependências e configurações
COPY --from=deps /app/node_modules     ./node_modules
COPY --from=deps /app/package*.json    ./
COPY --from=deps /app/prisma           ./prisma

# Copia arquivos de build
COPY tsconfig*.json ./
COPY src ./src
COPY uploads ./uploads

# ✅ Compila a aplicação
RUN npm run build --if-present

# ✅ Copia o package.json para dentro de dist (ponto chave para resolver o aviso)
RUN cp package.json ./dist/package.json

########################
# Stage 2 – runtime
########################
FROM node:20-alpine

WORKDIR /app

# Copia os artefatos do build
COPY --from=builder /app/dist           ./dist
COPY --from=builder /app/node_modules   ./node_modules
COPY --from=builder /app/package*.json  ./
COPY --from=builder /app/prisma         ./prisma
COPY --from=builder /app/uploads        ./uploads

# ✅ Copia o package.json também para dentro da dist se necessário
COPY --from=builder /app/dist/package.json ./dist/package.json

# Permissões e limpeza
USER root
RUN npm prune --omit=dev && npm cache clean --force \
 && addgroup -S app && adduser -S app -G app \
 && chown -R app:app /app

USER app

ENV NODE_ENV=production
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD \
  node -e "require('http').get('http://localhost:3000/health',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

# ✅ Caminho final correto do main.js
CMD ["node", "dist/main.js"]
