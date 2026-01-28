import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 sm:py-5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold m-0">Gestión de Beneficiarios</h1>
        <p className="text-xs sm:text-sm mt-1 opacity-90">Sistema de Gestión Multi-país</p>
      </div>
    </nav>
  );
};
