import React from 'react';
import { Mail, Phone, User } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-emerald-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Información Personal */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <User size={20} />
              <span className="font-semibold">Sebastian Velasquez</span>
            </div>
            <span className="text-blue-100 text-sm">Desarrollador Junior</span>
          </div>

          {/* Contacto */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <a
              href="mailto:juansivelasquez2004@gmail.com"
              className="flex items-center gap-2 hover:text-green-200 transition-colors"
            >
              <Mail size={18} />
              <span className="text-sm">juansivelasquez2004@gmail.com</span>
            </a>
            <a
              href="tel:+51928536274"
              className="flex items-center gap-2 hover:text-green-200 transition-colors"
            >
              <Phone size={18} />
              <span className="text-sm">+51 928 536 274</span>
            </a>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-emerald-400 mt-6 pt-4">
          <p className="text-center text-emerald-100 text-xs">
            © 2026 Sistema de Gestión de Beneficiarios. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
