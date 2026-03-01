import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function NavItem({ to, children }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={[
        'rounded-full px-4 py-2 text-sm font-semibold transition',
        active
          ? 'bg-white/20 text-white'
          : 'text-white/80 hover:bg-white/15 hover:text-white',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}
