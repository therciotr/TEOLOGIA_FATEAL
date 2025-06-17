// src/components/ui/Card.tsx

import React, { ReactNode } from 'react';
import classNames from 'classnames';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={classNames(
        'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors',
        className
      )}
    >
      {children}
    </div>
  );
};

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export const CardHeader: React.FC<SectionProps> = ({ children, className = '' }) => (
  <div className={classNames('px-6 py-4 border-b border-slate-200 dark:border-slate-700', className)}>
    {children}
  </div>
);

export const CardContent: React.FC<SectionProps> = ({ children, className = '' }) => (
  <div className={classNames('px-6 py-4', className)}>{children}</div>
);

export const CardFooter: React.FC<SectionProps> = ({ children, className = '' }) => (
  <div className={classNames('px-6 py-4 border-t border-slate-200 dark:border-slate-700', className)}>
    {children}
  </div>
);