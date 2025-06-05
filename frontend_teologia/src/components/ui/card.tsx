
import React, { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded shadow p-4 border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};
