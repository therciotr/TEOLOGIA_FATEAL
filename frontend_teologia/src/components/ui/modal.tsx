
import React, { ReactNode } from 'react';
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
  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
        {title && (
          <div className="border-b p-4 font-semibold text-lg">
            {title}
          </div>
        )}
        <div className="p-4">{children}</div>
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring focus:border-blue-500 transition"
            aria-label="Fechar modal"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
