// src/main.tsx
import React, { StrictMode, Suspense } from 'react';
import { createRoot }        from 'react-dom/client';
import { BrowserRouter }     from 'react-router-dom';

import App           from './App';
import './index.css';

/* —— Providers globais ————————————————————— */
import { ToastProvider } from '@/components/ui/toast';      // notifications
import { AuthProvider  } from '@/hooks/useAuth';            // contexto de sessão/login
import { Spinner       } from '@/components/ui/spinner';    // loading global
//                    ▲  ╰── pasta/arquivo em minúsculo *exatamente*
//                       (Linux diferencia maiúsc/minúsc)

/* —— Mount point ———————————————————————— */
const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error(
    '❌ <div id="root"></div> não encontrado em index.html - verifique a estrutura!',
  );
}

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL ?? '/'}>
      <ToastProvider>
        <AuthProvider>
          <Suspense fallback={<Spinner className="mx-auto mt-10" />}>
            <App />
          </Suspense>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
