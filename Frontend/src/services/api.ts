import { apiCall } from './httpClient';
import { DocumentoIdentidad, Beneficiario, BeneficiarioCreateDto } from '../types/api';

// DocumentoIdentidad Service
export const documentoIdentidadService = {
  getActivos: async (): Promise<DocumentoIdentidad[]> => {
    return await apiCall<DocumentoIdentidad[]>('/documentosidentidad/activos');
  },

  getById: async (id: number): Promise<DocumentoIdentidad> => {
    return await apiCall<DocumentoIdentidad>(`/documentosidentidad/${id}`);
  },
};

// Beneficiario Service
export const beneficiarioService = {
  getAll: async (): Promise<Beneficiario[]> => {
    return await apiCall<Beneficiario[]>('/beneficiarios');
  },

  getById: async (id: number): Promise<Beneficiario> => {
    return await apiCall<Beneficiario>(`/beneficiarios/${id}`);
  },

  create: async (beneficiario: BeneficiarioCreateDto): Promise<number> => {
    return await apiCall<number>('/beneficiarios', {
      method: 'POST',
      body: JSON.stringify(beneficiario),
    });
  },

  update: async (id: number, beneficiario: BeneficiarioCreateDto): Promise<void> => {
    await apiCall<void>(`/beneficiarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(beneficiario),
    });
  },

  delete: async (id: number): Promise<void> => {
    await apiCall<void>(`/beneficiarios/${id}`, {
      method: 'DELETE',
    });
  },
};
