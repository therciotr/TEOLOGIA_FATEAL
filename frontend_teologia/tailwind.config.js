// tailwind.config.ts
import type { Config } from 'tailwindcss'
import defaultTheme    from 'tailwindcss/defaultTheme'
import forms           from '@tailwindcss/forms'
import typography      from '@tailwindcss/typography'
import aspectRatio     from '@tailwindcss/aspect-ratio'
import scrollbar       from 'tailwind-scrollbar'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx,css}',
  ],

  darkMode: 'class',

  theme: {
    /** ❗ NÃO sobrescreva, apenas _estenda_ a paleta */
    extend: {
      /* sua cor primária */
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          dark:    '#4338ca',
        },
      },

      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },

      borderRadius: { xl: '1rem' },

      boxShadow: {
        'sm-blue': '0 1px 2px 0 rgba(79,70,229,.20)',
        'md-blue': '0 4px 6px -1px rgba(79,70,229,.25), 0 2px 4px -2px rgba(79,70,229,.10)',
      },

      /* animações utilitárias */
      keyframes: {
        fadeIn : { '0%':{opacity:0,transform:'translateY(5px)'},
                   '100%':{opacity:1,transform:'translateY(0)'} },
        fadeOut: { '0%':{opacity:1,transform:'translateY(0)'},
                   '100%':{opacity:0,transform:'translateY(5px)'} },
        slideUp: { '0%':{opacity:.4,transform:'translateY(10px)'},
                   '100%':{opacity:1,transform:'translateY(0)'} },
        scaleIn: { '0%':{opacity:0,transform:'scale(.95)'},
                   '100%':{opacity:1,transform:'scale(1)'} },
        pulse  : { '0%,100%':{opacity:1}, '50%':{opacity:.5} },
      },

      animation: {
        'fade-in'   : 'fadeIn .3s ease-out both',
        'fade-out'  : 'fadeOut .3s ease-in  both',
        'slide-up'  : 'slideUp .25s ease-out both',
        'scale-in'  : 'scaleIn .2s ease-out both',
        'pulse-slow': 'pulse 2s  infinite',
      },

      container: {
        center: true,
        padding: { DEFAULT:'1rem', md:'2rem', lg:'2.5rem' },
      },
    },
  },

  /*  ─ Safelist apenas para utilitários usados via @apply ─  */
  safelist: [
    /* radius & layout */
    'rounded-md','rounded-xl','rounded-full',
    'w-64','min-h-screen','p-6','gap-2','gap-4',

    /* texto/cores que aparecem em @apply */
    'text-xs','text-sm','text-white','text-red-500',
    'bg-slate-800','bg-slate-900',

    /* sombras declaradas via var(--shadow-md) */
    'shadow','shadow-md',

    /* animações customizadas */
    { pattern: /animate-(fade-in|fade-out|slide-up|scale-in|pulse-slow)/ },
  ],

  plugins: [
    forms,
    typography,
    aspectRatio,
    scrollbar({ nocompatible: true }),
  ],
}

export default config
