// src/components/ui/Spinner.tsx
import React from 'react';
import clsx from 'clsx'; // se quiser usar utilitário para classnames (opcional)

interface SpinnerProps {
  className?: string;
  size?: number; // permite configurar o tamanho do spinner
}

export const Spinner: React.FC<SpinnerProps> = ({
  className = '',
  size = 32, // valor padrão
}) => {
  const dimension = `${size}px`;

  return (
    <svg
      className={clsx('animate-spin text-primary', className)}
      style={{ height: dimension, width: dimension }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 000 16v4l3.5-3.5L12 20v-4a8 8 0 01-8-8z"
      />
    </svg>
  );
};
