/**
 * ToastProvider – encapsula o <Toaster/> e exporta helpers para disparar toasts.
 *
 * Como usar:
 *    import { toast } from '@/components/ui/toast';
 *    toast.success('Aluno salvo com sucesso!');
 *    toast.error('Algo deu errado…');
 *    toast.loading('Enviando…');
 */

import { Toaster, toast as hotToast, ToastOptions } from 'react-hot-toast';
import React from 'react';

/* ---- Estilos globais de toast (cores, duração etc.) ---------------------- */
const defaultOptions: ToastOptions = {
  duration: 4_000,
  style: {
    background: '#1e293b',          // slate-800
    color: '#f8fafc',               // slate-50
  },
  // Dark-mode automático (usa prefers-color-scheme ou html.dark):
  className: 'dark:bg-slate-800 dark:text-slate-100',
};

/* ---- Provedor a ser colocado no topo da árvore React --------------------- */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    {children}
    <Toaster
      position="top-right"
      toastOptions={defaultOptions}
    />
  </>
);

/* ---- Reexporta a função principal de disparo ----------------------------- */
export const toast = {
  success: (msg: string, opts?: ToastOptions) => hotToast.success(msg, { ...defaultOptions, ...opts }),
  error:   (msg: string, opts?: ToastOptions) => hotToast.error(msg,   { ...defaultOptions, ...opts }),
  loading: (msg: string, opts?: ToastOptions) => hotToast.loading(msg, { ...defaultOptions, ...opts }),
  // toast.dismiss() continua acessível via hotToast.dismiss()
};
