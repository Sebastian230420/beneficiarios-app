import React, { useState, useEffect } from 'react';
import { BeneficiarioCreateDto, DocumentoIdentidad } from '../types/api';
import { documentoIdentidadService } from '../services/api';

interface BeneficiarioFormProps {
  onSubmit: (beneficiario: BeneficiarioCreateDto) => Promise<void>;
  initialValues?: BeneficiarioCreateDto;
  isLoading?: boolean;
  isEditing?: boolean;
}

export const BeneficiarioForm: React.FC<BeneficiarioFormProps> = ({
  onSubmit,
  initialValues,
  isLoading = false,
  isEditing = false,
}) => {
  const [documentos, setDocumentos] = useState<DocumentoIdentidad[]>([]);
  const [selectedDocumento, setSelectedDocumento] = useState<DocumentoIdentidad | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BeneficiarioCreateDto>(
    initialValues || {
      nombres: '',
      apellidos: '',
      documentoIdentidadId: 0,
      numeroDocumento: '',
      fechaNacimiento: '',
      sexo: 'M',
    }
  );

  useEffect(() => {
    loadDocumentos();
  }, []);

  useEffect(() => {
    if (formData.documentoIdentidadId && documentos.length > 0) {
      const doc = documentos.find(d => d.id === formData.documentoIdentidadId);
      setSelectedDocumento(doc || null);
      setErrors({ ...errors, numeroDocumento: '' });
    }
  }, [formData.documentoIdentidadId, documentos]);

  const loadDocumentos = async () => {
    try {
      setLoading(true);
      const data = await documentoIdentidadService.getActivos();
      setDocumentos(data);
    } catch (error) {
      console.error('Error loading documentos:', error);
      setErrors({ ...errors, load: 'Error al cargar documentos de identidad' });
    } finally {
      setLoading(false);
    }
  };

  const validateNumeroDocumento = (numero: string): string => {
    if (!selectedDocumento) return '';

    if (numero.length !== selectedDocumento.longitud) {
      return `El documento debe tener exactamente ${selectedDocumento.longitud} caracteres`;
    }

    if (selectedDocumento.soloNumeros) {
      if (!/^\d+$/.test(numero)) {
        return 'El documento solo debe contener números';
      }
    }

    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'numeroDocumento') {
      const error = validateNumeroDocumento(value);
      setErrors({ ...errors, numeroDocumento: error });
    }

    setFormData({
      ...formData,
      [name]: name === 'documentoIdentidadId' ? parseInt(value) : value,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombres.trim()) newErrors.nombres = 'Los nombres son requeridos';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!formData.documentoIdentidadId) newErrors.documentoIdentidadId = 'Selecciona un tipo de documento';
    if (!formData.numeroDocumento.trim()) newErrors.numeroDocumento = 'El número de documento es requerido';
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';

    const docError = validateNumeroDocumento(formData.numeroDocumento);
    if (docError) newErrors.numeroDocumento = docError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      setFormData({
        nombres: '',
        apellidos: '',
        documentoIdentidadId: 0,
        numeroDocumento: '',
        fechaNacimiento: '',
        sexo: 'M',
      });
      setErrors({});
    } catch (error: any) {
      setErrors({ ...errors, submit: error.message || 'Error al guardar beneficiario' });
    }
  };

  const getFormatHint = (): string => {
    if (!selectedDocumento) return '';

    let hint = `${selectedDocumento.longitud} caracteres`;
    if (selectedDocumento.soloNumeros) {
      hint += ', solo números';
    }
    return hint;
  };

  return (
    <form className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md w-full lg:max-w-2xl mx-auto border border-gray-200 my-6" onSubmit={handleSubmit}>
      <div className="mb-6 flex flex-col">
        <label htmlFor="nombres" className="mb-2 font-semibold text-gray-800 text-sm">Nombres *</label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleInputChange}
          placeholder="Ingresa los nombres del beneficiario"
          disabled={isLoading}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg font-normal text-gray-700 transition-all duration-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
        />
        {errors.nombres && <span className="text-red-600 text-sm mt-1 font-medium">{errors.nombres}</span>}
      </div>

      <div className="mb-6 flex flex-col">
        <label htmlFor="apellidos" className="mb-2 font-semibold text-gray-800 text-sm">Apellidos *</label>
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleInputChange}
          placeholder="Ingresa los apellidos del beneficiario"
          disabled={isLoading}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg font-normal text-gray-700 transition-all duration-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
        />
        {errors.apellidos && <span className="text-red-600 text-sm mt-1 font-medium">{errors.apellidos}</span>}
      </div>

      <div className="mb-6 flex flex-col">
        <label htmlFor="documentoIdentidadId" className="mb-2 font-semibold text-gray-800 text-sm">Tipo de Documento *</label>
        <select
          id="documentoIdentidadId"
          name="documentoIdentidadId"
          value={formData.documentoIdentidadId}
          onChange={handleInputChange}
          disabled={isLoading || loading}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg font-normal text-gray-700 transition-all duration-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <option value={0}>Selecciona un tipo de documento</option>
          {documentos.map(doc => (
            <option key={doc.id} value={doc.id}>
              {doc.nombre} ({doc.abreviatura}) - {doc.pais}
            </option>
          ))}
        </select>
        {errors.documentoIdentidadId && <span className="text-red-600 text-sm mt-1 font-medium">{errors.documentoIdentidadId}</span>}
      </div>

      <div className="mb-6 flex flex-col">
        <label htmlFor="numeroDocumento" className="mb-2 font-semibold text-gray-800 text-sm">Número de Documento *</label>
        <input
          type="text"
          id="numeroDocumento"
          name="numeroDocumento"
          value={formData.numeroDocumento}
          onChange={handleInputChange}
          placeholder={selectedDocumento ? `Formato: ${getFormatHint()}` : 'Selecciona un tipo de documento primero'}
          disabled={!selectedDocumento || isLoading}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg font-normal text-gray-700 transition-all duration-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
        />
        {selectedDocumento && (
          <small className="text-gray-500 text-xs mt-1">{getFormatHint()}</small>
        )}
        {errors.numeroDocumento && <span className="text-red-600 text-sm mt-1 font-medium">{errors.numeroDocumento}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="fechaNacimiento" className="mb-2 font-semibold text-gray-800 text-sm">Fecha de Nacimiento *</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg font-normal text-gray-700 transition-all duration-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
          />
          {errors.fechaNacimiento && <span className="text-red-600 text-sm mt-1 font-medium">{errors.fechaNacimiento}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="sexo" className="mb-2 font-semibold text-gray-800 text-sm">Sexo *</label>
          <select
            id="sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg font-normal text-gray-700 transition-all duration-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
      </div>

      {errors.submit && <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">{errors.submit}</div>}
      {errors.load && <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">{errors.load}</div>}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2 sm:py-3 rounded-lg mt-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || loading || !formData.documentoIdentidadId}
      >
        {isLoading ? 'Guardando...' : isEditing ? 'Actualizar Beneficiario' : 'Guardar Beneficiario'}
      </button>
    </form>
  );
};
