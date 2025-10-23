import { Animal, MediaAnimal } from '@models/animales';
import { Especie } from '@models/animales/especie.model';
import { Habitat } from '@models/habitat';

// Interfaces para las respuestas del backend
export interface BackendMediaAnimalResponse {
  id_media: number;
  tipo_medio: 'imagen' | 'video' | 'audio';
  url: string;
  titulo: string;
  descripcion?: string;
  public_id: string;
}

export interface BackendEspecieResponse {
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
}

export interface BackendHabitatResponse {
  id_habitat: number;
  nombre_habitat: string;
  tipo: string;
  descripcion: string;
  condiciones_climaticas: string;
  is_active: boolean;
}

export interface BackendAnimalResponse {
  id_animal: number;
  nombre: string;
  genero: boolean;
  fecha_nacimiento: string;
  fecha_ingreso: string;
  procedencia: string;
  estado_operativo: 'Saludable' | 'En tratamiento' | 'En cuarentena' | 'Trasladado' | 'Fallecido';
  es_publico: boolean;
  descripcion: string;
  especie_id: number;
  habitat_id: number;
  especie: BackendEspecieResponse;
  habitat: BackendHabitatResponse;
  media: BackendMediaAnimalResponse[];
}

// Request para crear/actualizar animal
export interface CreateAnimalRequest {
  nombre: string;
  genero: boolean;
  fecha_nacimiento: string;
  fecha_ingreso: string;
  procedencia: string;
  estado_operativo: 'Saludable' | 'En tratamiento' | 'En cuarentena' | 'Trasladado' | 'Fallecido';
  es_publico: boolean;
  descripcion: string;
  especie_id: number;
  habitat_id: number;
}

export class AnimalAdapter {
  /**
   * Convierte la respuesta del backend a modelo del frontend
   */
  static fromBackend(backendAnimal: BackendAnimalResponse): Animal {
    return {
      id_animal: backendAnimal.id_animal,
      nombre: backendAnimal.nombre,
      genero: backendAnimal.genero,
      fecha_nacimiento: backendAnimal.fecha_nacimiento,
      fecha_ingreso: backendAnimal.fecha_ingreso,
      procedencia: backendAnimal.procedencia,
      estado_operativo: backendAnimal.estado_operativo,
      es_publico: backendAnimal.es_publico,
      descripcion: backendAnimal.descripcion,
      especie_id: backendAnimal.especie_id,
      habitat_id: backendAnimal.habitat_id,
      especie: this.especieFromBackend(backendAnimal.especie),
      habitat: this.habitatFromBackend(backendAnimal.habitat),
      media: backendAnimal.media.map(media => this.mediaFromBackend(media))
    };
  }

  /**
   * Convierte modelo del frontend a request para el backend
   */
  static toBackend(animal: Partial<Animal>): CreateAnimalRequest {
    return {
      nombre: animal.nombre!,
      genero: animal.genero!,
      fecha_nacimiento: animal.fecha_nacimiento!,
      fecha_ingreso: animal.fecha_ingreso!,
      procedencia: animal.procedencia!,
      estado_operativo: animal.estado_operativo!,
      es_publico: animal.es_publico!,
      descripcion: animal.descripcion!,
      especie_id: animal.especie_id!,
      habitat_id: animal.habitat_id!
    };
  }

  /**
   * Convierte especie del backend al modelo frontend
   */
  private static especieFromBackend(backendEspecie: BackendEspecieResponse): Especie {
    return {
      idEspecie: backendEspecie.id_especie,
      nombreCientifico: backendEspecie.nombre_cientifico,
      nombreComun: backendEspecie.nombre,
      filo: backendEspecie.filo,
      clase: backendEspecie.clase,
      orden: backendEspecie.orden,
      familia: backendEspecie.familia,
      genero: backendEspecie.genero,
      descripcion: backendEspecie.descripcion,
      isActive: backendEspecie.is_active
    };
  }

  /**
   * Convierte hábitat del backend al modelo frontend
   */
  private static habitatFromBackend(backendHabitat: BackendHabitatResponse): Habitat {
    return {
      id: backendHabitat.id_habitat,
      nombre: backendHabitat.nombre_habitat,
      tipo: backendHabitat.tipo,
      descripcion: backendHabitat.descripcion,
      condicionesClimaticas: backendHabitat.condiciones_climaticas,
      isActive: backendHabitat.is_active
    };
  }

  /**
   * Convierte media del backend al modelo frontend
   */
  private static mediaFromBackend(backendMedia: BackendMediaAnimalResponse): MediaAnimal {
    return {
      id_media: backendMedia.id_media,
      tipo_medio: backendMedia.tipo_medio,
      url: backendMedia.url,
      titulo: backendMedia.titulo,
      descripcion: backendMedia.descripcion,
      public_id: backendMedia.public_id
    };
  }

  /**
   * Obtiene el texto del género en español
   */
  static getGeneroTexto(genero: boolean): string {
    return genero ? 'Macho' : 'Hembra';
  }

  /**
   * Obtiene la clase CSS para el estado operativo
   */
  static getEstadoClass(estado: Animal['estado_operativo']): string {
    const clases: Record<Animal['estado_operativo'], string> = {
      'Saludable': 'estado-saludable',
      'En tratamiento': 'estado-tratamiento',
      'En cuarentena': 'estado-cuarentena',
      'Trasladado': 'estado-trasladado',
      'Fallecido': 'estado-fallecido'
    };
    return clases[estado] || '';
  }

  /**
   * Obtiene el color para el estado operativo
   */
  static getEstadoColor(estado: Animal['estado_operativo']): string {
    const colores: Record<Animal['estado_operativo'], string> = {
      'Saludable': 'success',
      'En tratamiento': 'info',
      'En cuarentena': 'warn',
      'Trasladado': 'secondary',
      'Fallecido': 'danger'
    };
    return colores[estado] || 'secondary';
  }
}