// Interfaz genérica para respuestas API
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  errors: string[] | null;
}

/**
 * Cliente HTTP genérico que maneja la estructura de respuestas API
 * Automáticamente extrae el campo "data" de las respuestas exitosas
 */
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = 'https://localhost:7197/api';
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // 204 No Content es exitoso pero sin body
    if (response.status === 204) {
      return null as unknown as T;
    }

    const jsonData: ApiResponse<T> = await response.json();

    // Manejar errores por código HTTP
    if (!response.ok) {
      const errorMessage = jsonData.message || 'Error desconocido';
      
      if (response.status === 400) {
        throw new Error(`Datos inválidos: ${errorMessage}`);
      }
      if (response.status === 404) {
        throw new Error(`No encontrado: ${errorMessage}`);
      }
      if (response.status === 500) {
        throw new Error(`Error del servidor: ${errorMessage}`);
      }
      throw new Error(errorMessage);
    }

    // Retornar solo los datos si fue exitoso
    if (jsonData.data === null) {
      return null as unknown as T;
    }

    return jsonData.data;
  } catch (error) {
    console.error('Error en API:', error);
    throw error;
  }
}
