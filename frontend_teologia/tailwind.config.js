// tailwind.config.js
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';

/** @type {Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class', // modo escuro via <html class="dark">

  theme: {
    extend: {
      /* ────────── Cores da marca ────────── */
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // indigo-600
          dark:    '#4338ca', // indigo-700
        },
      },

      /* ────────── Bordas arredondadas ───── */
      borderRadius: {
        xl: '1rem',          // 16 px  (sobrescreve se quiser maior)
      },

      /* ────────── Animações ─────────────── */
      keyframes: {
        /* Desliza levemente para cima */
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(5px)' },
          to:   { opacity: '1', transform: 'translateY(0)'  },
        },
        /* Zoom suave */
        fadeScale: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)'     },
        },
      },
      animation: {
        /* Use className="animate-fade"  */
        fade:     'fadeIn    0.3s ease-in-out',
        /* Use className="animate-fade-in" */
        'fade-in':'fadeScale 0.2s ease-out',
      },
    },
  },

  plugins: [forms, typography],
} satisfies Config;