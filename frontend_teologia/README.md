
# Painel Administrativo — Teologia FATEAL (Frontend)

Este é o painel web administrativo do projeto **Teologia FATEAL**, desenvolvido com **React + TypeScript + Vite**. Ele se comunica com o backend NestJS e oferece controle completo sobre os dados dos alunos, turmas, pagamentos, documentos, notificações e mais.

---

## ✅ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Firebase](https://firebase.google.com/) (para autenticação)
- [Prisma](https://www.prisma.io/) (via backend)

---

## ⚙️ Pré-requisitos

Antes de rodar este frontend, certifique-se de que:

- O backend esteja rodando em `http://localhost:3000` ou outro domínio configurado.
- Você tenha o `Node.js` e `npm` instalados.
- O arquivo `.env` esteja configurado corretamente (veja abaixo).

---

## 📦 Instalação

1. Clone este repositório:

```bash
git clone https://github.com/seuusuario/teologia-frontend.git
cd teologia-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` na raiz do projeto e configure:

```env
VITE_API_URL=http://localhost:3000/api
```

Você pode apontar `VITE_API_URL` para seu backend hospedado (ex: https://teologia.trtecnologias.com.br/api)

---

## 🚀 Rodando o Projeto

```bash
npm run dev
```

O painel estará disponível em `http://localhost:5173`

---

## 🧪 Build de Produção

Para gerar os arquivos finais do frontend:

```bash
npm run build
```

O conteúdo será gerado na pasta `dist/`, pronto para ser hospedado.

---

## 🧠 Observações

- As permissões de acesso são controladas pelo backend (admin, professor, etc).
- O login utiliza autenticação via Firebase.
- Certifique-se de que o backend e banco de dados estejam ativos.

---

## 🛠️ Estrutura de Pastas

```bash
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
└── vite.config.ts
```

---

## 👨‍💻 Desenvolvido por TR TECNOLOGIAS
