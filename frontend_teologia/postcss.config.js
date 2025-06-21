// postcss.config.js – Tailwind 4+ + Vite 6+

import tailwind from '@tailwindcss/postcss';  // ✅ plugin correto
import autoprefixer from 'autoprefixer';

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    tailwind,
    autoprefixer,
  ],
};
