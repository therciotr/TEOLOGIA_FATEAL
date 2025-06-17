import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      className: 'dark:bg-slate-800 dark:text-slate-100',
    }}
  />
);