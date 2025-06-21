// tailwind.config.ts  – compatível Tailwind v4/v5 + Vite 6
import type { Config }  from 'tailwindcss';
import defaultTheme     from 'tailwindcss/defaultTheme';
import colors           from 'tailwindcss/colors';
import forms            from '@tailwindcss/forms';
import typography       from '@tailwindcss/typography';
import scrollbar        from 'tailwind-scrollbar';

// Paleta Slate clássica (Tailwind v3.x)
const slateClassic = {
  50 : '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
};

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      // Paleta
      colors: {
        slate: slateClassic,                // <- 🟢 Corrigido aqui
        neutral: colors.neutral,
        gray: colors.gray,
        primary: {
          DEFAULT: '#4f46e5',               // Indigo-600
          dark: '#4338ca',                  // Indigo-700
        },
      },

      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },

      borderRadius: {
        xl: '1rem',
      },

      keyframes: {
        fadeIn:   { '0%': {opacity:0, transform:'translateY(5px)'}, '100%': {opacity:1, transform:'translateY(0)'} },
        fadeOut:  { '0%': {opacity:1, transform:'translateY(0)'},   '100%': {opacity:0, transform:'translateY(5px)'} },
        slideUp:  { '0%': {opacity:.4, transform:'translateY(10px)'}, '100%': {opacity:1, transform:'translateY(0)'} },
        scaleIn:  { '0%': {opacity:0, transform:'scale(.95)'},      '100%': {opacity:1, transform:'scale(1)'} },
      },

      animation: {
        fade:       'fadeIn .3s ease-out both',
        'fade-in':  'fadeIn .3s ease-out both',
        'fade-out': 'fadeOut .3s ease-in both',
        'slide-up': 'slideUp .25s ease-out both',
        'scale-in': 'scaleIn .2s ease-out both',
      },

      container: {
        center: true,
        padding: '1rem',
      },
    },
  },

  safelist: [
    { pattern: /(animate-(fade-in|fade-out|slide-up|scale-in)|^(bg|text)-primary(-dark)?$|^dark$)/ },
  ],

  plugins: [
    forms,
    typography,
    scrollbar({ nocompatible: true }),
  ],

  experimental: { nesting: true },
};

export default config;
