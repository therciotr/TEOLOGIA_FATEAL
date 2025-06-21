// src/main.tsx
import React, { StrictMode, Suspense } from 'react';
import { createRoot }      from 'react-dom/client';
import { BrowserRouter }   from 'react-router-dom';

import App                 from './App';
import './index.css';                    // importa Tailwind + estilos globais

/* ▸ Providers globais ------------------------------------ */
import { ToastProvider }   from '@/components/ui/toast';
import { AuthProvider }    from '@/hooks/useAuth';
import { Spinner }         from '@/components/ui/spinner';

/* ▸ Montagem (React 18) ---------------------------------- */
const rootEl = document.getElementById('root');

if (!rootEl) {
  // Fall-back simples → evita throw em produção
  console.error('<div id="root"> não encontrado em index.html');
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL ?? '/'}>
        <ToastProvider>
          <AuthProvider>
            <Suspense fallback={<Spinner className="mx-auto mt-10 h-8 w-8" />}>
              <App />
            </Suspense>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </StrictMode>,
  );
}
