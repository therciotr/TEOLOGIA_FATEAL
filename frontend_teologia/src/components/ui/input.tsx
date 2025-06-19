// src/components/ui/input.tsx
import React, { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...rest }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          {...rest}
          className={classNames(
            'w-full px-3 py-2 rounded-md border text-sm transition',
            'bg-white dark:bg-slate-700 text-slate-800 dark:text-white',
            'placeholder-slate-400 dark:placeholder-slate-400/70',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-300 dark:border-slate-600',
            rest.disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        />

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';