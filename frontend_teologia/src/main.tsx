// src/main.tsx
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/* ─────────── Providers globais ─────────── */
import { ToastProvider } from '@/components/ui/ToastProvider';   // toasts shadcn/ui
import { AuthProvider } from '@/hooks/useAuth';                 // remember-me + sessão
import { Spinner } from '@/components/ui/Spinner';              // opcional, mostra "Carregando..."

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ToastProvider>
        <AuthProvider>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </AuthProvider>
      </ToastProvider>
    </React.StrictMode>
  );
}