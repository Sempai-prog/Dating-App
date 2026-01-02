import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className={`font-serif font-bold tracking-tight select-none ${sizeClasses[size]} ${className}`}>
      match
      <span className="text-brand-pink">.</span>
    </div>
  );
};