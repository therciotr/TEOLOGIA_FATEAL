// src/components/ui/input-icon.tsx
import React, { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { LucideIcon } from 'lucide-react';

interface InputIconProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  error?: string;
  label?: string;
  className?: string;
}

export const InputIcon = forwardRef<HTMLInputElement, InputIconProps>(
  (
    {
      startIcon: StartIcon,
      endIcon: EndIcon,
      error,
      label,
      id,
      className = '',
      ...rest
    },
    ref
  ) => {
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

        <div className="relative">
          {StartIcon && (
            <StartIcon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          )}

          <input
            id={inputId}
            ref={ref}
            {...rest}
            className={classNames(
              'w-full pl-10 pr-10 py-2 rounded-md border text-sm transition',
              'bg-white dark:bg-slate-700 text-slate-800 dark:text-white',
              'placeholder-slate-400 dark:placeholder-slate-400/70',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-slate-300 dark:border-slate-600',
              className
            )}
          />

          {EndIcon && (
            <EndIcon
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          )}
        </div>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

InputIcon.displayName = 'InputIcon';