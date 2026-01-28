import React from 'react';
import { Beneficiario } from '../types/api';

interface BeneficiarioTableProps {
  beneficiarios: Beneficiario[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const BeneficiarioTable: React.FC<BeneficiarioTableProps> = ({
  beneficiarios,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateAge = (dateString: string): number => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (beneficiarios.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center border border-gray-200">
        <p className="text-gray-500 text-base sm:text-lg font-medium">No hay beneficiarios registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto border border-gray-200 w-full">
      <table className="w-full border-collapse text-xs sm:text-sm">
        <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <tr>
            <th className="px-2 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">Nombres</th>
            <th className="px-2 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">Apellidos</th>
            <th className="px-2 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">Tipo Doc.</th>
            <th className="px-2 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">Número Doc.</th>
            <th className="px-2 sm:px-4 py-3 text-left font-semibold whitespace-nowrap hidden md:table-cell">Fecha Nac.</th>
            <th className="px-2 sm:px-4 py-3 text-left font-semibold whitespace-nowrap hidden lg:table-cell">Edad</th>
            <th className="px-2 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">Sexo</th>
            <th className="px-2 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {beneficiarios.map(beneficiario => (
            <tr key={beneficiario.id} className="border-b border-gray-200 hover:bg-gray-50 text-xs sm:text-sm">
              <td className="px-2 sm:px-4 py-3">{beneficiario.nombres}</td>
              <td className="px-2 sm:px-4 py-3">{beneficiario.apellidos}</td>
              <td className="px-2 sm:px-4 py-3">{beneficiario.documentoIdentidad?.nombre || '-'}</td>
              <td className="px-2 sm:px-4 py-3">{beneficiario.numeroDocumento}</td>
              <td className="px-2 sm:px-4 py-3 hidden md:table-cell">{formatDate(beneficiario.fechaNacimiento)}</td>
              <td className="px-2 sm:px-4 py-3 text-center hidden lg:table-cell">{calculateAge(beneficiario.fechaNacimiento)}</td>
              <td className="px-2 sm:px-4 py-3 text-center">{beneficiario.sexo === 'M' ? 'M' : 'F'}</td>
              <td className="px-2 sm:px-4 py-3">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(beneficiario.id)}
                    className="px-2 sm:px-3 py-1 sm:py-2 rounded text-xs font-semibold cursor-pointer transition-all duration-300 bg-green-500 text-white hover:bg-green-600 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    title="Editar"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`¿Estás seguro de que deseas eliminar a ${beneficiario.nombres} ${beneficiario.apellidos}?`)) {
                        onDelete(beneficiario.id);
                      }
                    }}
                    className="px-2 sm:px-3 py-1 sm:py-2 rounded text-xs font-semibold cursor-pointer transition-all duration-300 bg-red-500 text-white hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    title="Eliminar"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
