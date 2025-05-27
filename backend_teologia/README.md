
# 🐳 Backend Teologia - Docker

## ✅ Como usar:

### 📦 Build e subir os containers:

```bash
docker-compose up --build
```

➡️ Isso irá:  
✅ Construir a imagem do backend.  
✅ Subir o MariaDB na porta `3306`.  
✅ Subir o NestJS na porta `3000`.

---

### 🚪 Acessar:

- **API Backend**: http://localhost:3000  
- **MariaDB**: localhost:3306 (usuário: `trsystemas_teologia`)

---

### 🛑 Parar e remover containers:

```bash
docker-compose down
```

---

### 🧹 Parar, remover e limpar volumes:

```bash
docker-compose down -v
```

➡️ Remove também os dados do MariaDB.

---

### 🐳 Ver containers ativos:

```bash
docker ps
```

---

## ✅ Importante:

- Arquivo `.env` → **não é necessário** no container, já está no `docker-compose.yml`.  
- Prisma → `npx prisma generate` já está no `Dockerfile`.  
- Não inclua `node_modules` no container.
