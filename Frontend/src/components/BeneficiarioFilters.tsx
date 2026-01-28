import React from 'react';
import { DocumentoIdentidad } from '../types/api';

interface BeneficiarioFiltersProps {
  searchName: string;
  selectedDocumento: number;
  selectedSexo: string;
  onSearchChange: (search: string) => void;
  onDocumentoChange: (id: number) => void;
  onSexoChange: (sexo: string) => void;
  onReset: () => void;
  documentos: DocumentoIdentidad[];
  isLoading?: boolean;
}

export const BeneficiarioFilters: React.FC<BeneficiarioFiltersProps> = ({
  searchName,
  selectedDocumento,
  selectedSexo,
  onSearchChange,
  onDocumentoChange,
  onSexoChange,
  onReset,
  documentos,
  isLoading = false,
}) => {
  const hasFilters = searchName || selectedDocumento || selectedSexo;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtros de búsqueda</h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-sm px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200 border border-gray-300 font-medium"
            disabled={isLoading}
          >
            🔄 Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Búsqueda por nombre */}
        <div className="flex flex-col">
          <label htmlFor="search-name" className="mb-2 font-semibold text-gray-800 text-sm">
            Buscar por nombre
          </label>
          <input
            type="text"
            id="search-name"
            value={searchName}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Nombre o apellido..."
            disabled={isLoading}
            className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg font-normal text-gray-700 transition-all duration-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Filtro por tipo de documento */}
        <div className="flex flex-col">
          <label htmlFor="filter-documento" className="mb-2 font-semibold text-gray-800 text-sm">
            Tipo de documento
          </label>
          <select
            id="filter-documento"
            value={selectedDocumento}
            onChange={(e) => onDocumentoChange(Number(e.target.value) || 0)}
            disabled={isLoading}
            className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg font-normal text-gray-700 transition-all duration-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value={0}>Todos los documentos</option>
            {documentos.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.nombre} ({doc.abreviatura})
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por sexo */}
        <div className="flex flex-col">
          <label htmlFor="filter-sexo" className="mb-2 font-semibold text-gray-800 text-sm">
            Sexo
          </label>
          <select
            id="filter-sexo"
            value={selectedSexo}
            onChange={(e) => onSexoChange(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg font-normal text-gray-700 transition-all duration-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Todos</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          <span>
            {searchName && <span className="font-medium">Nombre: "{searchName}"</span>}
            {searchName && (selectedDocumento || selectedSexo) && <span className="mx-2">•</span>}
            {selectedDocumento > 0 && (
              <span className="font-medium">
                Documento: {documentos.find(d => d.id === selectedDocumento)?.nombre}
              </span>
            )}
            {(searchName || selectedDocumento) && selectedSexo && <span className="mx-2">•</span>}
            {selectedSexo && <span className="font-medium">Sexo: {selectedSexo === 'M' ? 'Masculino' : 'Femenino'}</span>}
          </span>
        </div>
      )}
    </div>
  );
};
