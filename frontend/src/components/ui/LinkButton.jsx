import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkButton({
  to,
  className = '',
  variant = 'primary',
  children,
}) {
  const baseClasses =
    'rounded-full px-6 py-3 text-sm font-extrabold transition';
  const variants = {
    primary: 'bg-white text-black hover:bg-white/90',
    secondary: 'border border-white/20 bg-white/10 hover:bg-white/20',
    tertiary: 'text-white/70 hover:text-white',
  };

  return (
    <Link
      to={to}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
