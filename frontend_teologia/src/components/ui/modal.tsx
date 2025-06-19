// src/components/ui/modal.tsx
import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  // Fecha com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg shadow-lg w-11/12 max-w-lg mx-auto animate-fade-in transition-transform">
        {/* Botão de Fechar no canto superior */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-red-500 focus:outline-none"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {title && (
          <div className="border-b p-4 font-semibold text-lg" id="modal-title">
            {title}
          </div>
        )}

        <div className="p-4">{children}</div>

        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-sm bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};