import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      // ✅ Habilita fast refresh e melhorias de dev
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ Permite importações com "@/"
    },
  },
  css: {
    preprocessorOptions: {
      // ✅ Se quiser usar SCSS no futuro
      scss: {
        additionalData: `@import "@/styles/variables.scss";`, // opcional
      },
    },
  },
  server: {
    port: 5173,
    open: true, // ✅ Abre o navegador automaticamente
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 🔁 Redireciona chamadas da API para backend NestJS
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // ✅ Remove o prefixo "/api" nas rotas
      },
    },
  },
  build: {
    outDir: 'dist', // ✅ Pasta de saída padrão
    sourcemap: false, // ✅ Pode ativar true para debug
  },
});