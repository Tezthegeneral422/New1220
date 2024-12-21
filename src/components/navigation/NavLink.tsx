import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${
        isActive 
          ? 'text-button-primary' 
          : 'text-gray-300 hover:text-button-primary'
      }`}
    >
      {children}
    </Link>
  );
}