# Etapa 1: Build do frontend
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: Servir os arquivos estáticos usando nginx
FROM nginx:1.25

COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar arquivo nginx.conf personalizado (opcional, para cache/headers)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
