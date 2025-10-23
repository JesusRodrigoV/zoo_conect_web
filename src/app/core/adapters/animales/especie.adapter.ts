import { Especie } from '@app/core/models/animales/especie.model';

export interface EspecieApiResponse {
  id_especie: number;
  nombre_cientifico: string;
  nombre: string;
  filo: string;
  clase: string;
  orden: string;
  familia: string;
  genero: string;
  descripcion: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateEspecieRequest {
  nombre_cientifico: string;
  nombre: string; 
  filo: string;
  clase: string;
  orden: string;
  familia: string;
  genero: string;
  descripcion: string;
  is_active?: boolean;
}

export interface UpdateEspecieRequest extends Partial<CreateEspecieRequest> {
  id_especie: number;
}

/**
 * Adapter para convertir entre el modelo de dominio Especie
 * y las respuestas/requests del API
 */
export class EspecieAdapter {
  
  /**
   * Convierte la respuesta del API a nuestro modelo de dominio
   */
  static fromApi(apiResponse: EspecieApiResponse): Especie {
    return {
      idEspecie: apiResponse.id_especie,
      nombreCientifico: apiResponse.nombre_cientifico,
      nombreComun: apiResponse.nombre,
      filo: apiResponse.filo,
      clase: apiResponse.clase,
      orden: apiResponse.orden,
      familia: apiResponse.familia,
      genero: apiResponse.genero,
      descripcion: apiResponse.descripcion,
      isActive: apiResponse.is_active
    };
  }
  
  /**
   * Convierte múltiples respuestas del API a nuestro modelo de dominio
   */
  static fromApiArray(apiResponses: EspecieApiResponse[]): Especie[] {
    return apiResponses.map(response => this.fromApi(response));
  }
  
  /**
   * Convierte nuestro modelo de dominio al formato del API para crear
   */
  static toCreateRequest(especie: Omit<Especie, 'idEspecie'>): CreateEspecieRequest {
    return {
      nombre_cientifico: especie.nombreCientifico,
      nombre: especie.nombreComun,
      filo: especie.filo,
      clase: especie.clase,
      orden: especie.orden,
      familia: especie.familia,
      genero: especie.genero,
      descripcion: especie.descripcion,
      is_active: especie.isActive
    };
  }
  
  /**
   * Convierte nuestro modelo de dominio al formato del API para actualizar
   */
  static toUpdateRequest(especie: Especie): UpdateEspecieRequest {
    return {
      id_especie: especie.idEspecie,
      nombre_cientifico: especie.nombreCientifico,
      nombre: especie.nombreComun,
      filo: especie.filo,
      clase: especie.clase,
      orden: especie.orden,
      familia: especie.familia,
      genero: especie.genero,
      descripcion: especie.descripcion,
      is_active: especie.isActive
    };
  }
  
  /**
   * Convierte datos parciales para actualizaciones PATCH
   */
  static toPartialUpdateRequest(
    id: number, 
    changes: Partial<Omit<Especie, 'idEspecie'>>
  ): Partial<UpdateEspecieRequest> {
    const request: Partial<UpdateEspecieRequest> = {
      id_especie: id
    };
    
    if (changes.nombreCientifico !== undefined) {
      request.nombre_cientifico = changes.nombreCientifico;
    }
    if (changes.nombreComun !== undefined) {
      request.nombre = changes.nombreComun;
    }
    if (changes.filo !== undefined) {
      request.filo = changes.filo;
    }
    if (changes.clase !== undefined) {
      request.clase = changes.clase;
    }
    if (changes.orden !== undefined) {
      request.orden = changes.orden;
    }
    if (changes.familia !== undefined) {
      request.familia = changes.familia;
    }
    if (changes.genero !== undefined) {
      request.genero = changes.genero;
    }
    if (changes.descripcion !== undefined) {
      request.descripcion = changes.descripcion;
    }
    if (changes.isActive !== undefined) {
      request.is_active = changes.isActive;
    }
    
    return request;
  }
}