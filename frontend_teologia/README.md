# Painel Administrativo — Teologia FATEAL (Frontend)

## 🚀 Como rodar localmente

1. Instale as dependências:
    ```bash
    npm install
    ```

2. Copie o arquivo de ambiente:
    ```bash
    cp .env.example .env
    ```

3. Rode o projeto:
    ```bash
    npm run dev
    ```

## 🛠️ Estrutura principal

- `public/`: Arquivos públicos (index.html, favicon, etc)
- `src/`: Código fonte React/TypeScript
  - `components/`: Componentes reutilizáveis
  - `pages/`: Páginas principais (Dashboard, Login, Alunos, etc)
  - `services/`: Serviços de API/autenticação
  - `App.tsx`: Configuração das rotas
  - `main.tsx`: Entrada da aplicação

## 📦 Build para produção

```bash
npm run build