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
  const baseClasses = [
    'inline-flex', 'items-center', 'justify-center',
    'px-4', 'py-2', 'rounded-md', 'font-medium',
    'transition-colors', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2',
  ];

  const variantClasses: Record<string, string[]> = {
    primary: ['bg-indigo-600', 'text-white', 'hover:bg-indigo-700', 'focus:ring-indigo-500'],
    outline: ['border', 'border-indigo-600', 'text-indigo-600', 'hover:bg-indigo-50'],
    danger: ['bg-red-600', 'text-white', 'hover:bg-red-700', 'focus:ring-red-500'],
    ghost: ['bg-transparent', 'text-slate-600', 'hover:bg-slate-100'],
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        ...baseClasses,
        ...variantClasses[variant],
        className,
        (disabled || loading) && 'opacity-50 cursor-not-allowed'
      )}
    >
      {loading ? (
        <span className="animate-pulse-slow">Carregando...</span>
      ) : (
        children
      )}
    </button>
  );
};
