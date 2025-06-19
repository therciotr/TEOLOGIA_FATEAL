// src/components/ui/Button.tsx

import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'primary' | 'outline' | 'danger' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
  disabled = false,
  loading = false,
}) => {
  const baseClasses =
    'font-semibold py-2 px-4 rounded transition focus:outline-none focus:ring focus:ring-offset-1';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        className,
        (disabled || loading) && 'opacity-50 cursor-not-allowed'
      )}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
};