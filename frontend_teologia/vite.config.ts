// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// ➜ “__dirname” no formato ESM
const r = (...p: string[]) => path.resolve(path.dirname(new URL(import.meta.url).pathname), ...p);

export default defineConfig({
  plugins: [
    // Inclui TS/JSX/JTSX por padrão, não precisa do "include"
    react(),
  ],

  /* ─────────── importações absolutas “@/...” ─────────── */
  resolve: {
    alias: { '@': r('src') },
  },

  /* ─────────── CSS / PostCSS / Sass ─────────── */
  css: {
    /** → garante que o PostCSS (Tailwind) será lido */
    postcss: r('postcss.config.js'),

    /** → caso use SCSS opcionais */
    preprocessorOptions: {
      scss: {
        // “@use” é a sintaxe recomendada no Sass
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },

  /* ─────────── Dev server ─────────── */
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    strictPort: true,

    /** proxy opcional para API local */
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ''),
      },
    },
  },

  /* ─────────── Build ─────────── */
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    assetsInlineLimit: 4_096, // 4 KB
  },

  /* ─────────── Preview (vite preview) ─────────── */
  preview: {
    port: 4173,
    open: true,
  },
});
