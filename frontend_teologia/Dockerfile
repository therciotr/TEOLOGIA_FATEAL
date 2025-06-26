# Etapa 1: Build do frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependência
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar demais arquivos (inclui src/, public/, vite.config.ts etc.)
COPY . .

# Copiar também .env.production
COPY .env.production .env.production

# Definir ambiente de produção para Vite
ENV NODE_ENV=production

# ⚠️ VITE_API_URL deve vir do .env.production
# Se quiser forçar sobreposição via ARG:
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build do Vite
RUN npm run build

# Etapa 2: Servir com NGINX
FROM nginx:1.25-alpine

# Copiar arquivos de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada de SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta padrão
EXPOSE 80

# Entrypoint do nginx
CMD ["nginx", "-g", "daemon off;"]
