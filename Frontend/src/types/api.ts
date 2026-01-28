export interface DocumentoIdentidad {
  id: number;
  nombre: string;
  abreviatura: string;
  pais: string;
  longitud: number;
  soloNumeros: boolean;
}

export interface Beneficiario {
  id: number;
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: 'M' | 'F';
  documentoIdentidad?: DocumentoIdentidad;
}

export interface BeneficiarioCreateDto {
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: 'M' | 'F';
}
