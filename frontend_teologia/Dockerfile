# Etapa 1: Build do frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependência
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar demais arquivos
COPY . .

# Variável passada pelo docker-compose ou linha de comando
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build do projeto Vite
RUN npm run build

# Etapa 2: Imagem final com nginx
FROM nginx:1.25-alpine

# Copiar arquivos de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Substituir a configuração padrão do nginx (SPA + cache)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta padrão do nginx
EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]
