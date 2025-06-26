import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Compatibilidade para "__dirname" no formato ESM
const r = (...p: string[]) => path.resolve(path.dirname(new URL(import.meta.url).pathname), ...p);

export default defineConfig({
  base: '/', // Essencial para Firebase Hosting ou root

  plugins: [react()],

  resolve: {
    alias: {
      '@': r('src'),
    },
  },

  css: {
    postcss: r('postcss.config.js'),
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ''),
      },
    },
  },

  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // ✅ Importante para debug em produção
    assetsInlineLimit: 4096,
  },

  preview: {
    port: 4173,
    open: true,
  },

  define: {
    // ✅ Correções para evitar erros durante o build
    'process.env.NODE_ENV': '"production"',
    'global': 'globalThis',
    '__REACT_DEVTOOLS_GLOBAL_HOOK__': JSON.stringify({ isDisabled: true }),
  },
});
