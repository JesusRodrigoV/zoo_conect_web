import { Especie } from './especie.model';
import { Habitat } from '../habitat';

export interface MediaAnimal {
  id_media: number;
  tipo_medio: 'imagen' | 'video' | 'audio';
  url: string;
  titulo: string;
  descripcion?: string;
  public_id: string;
}

export interface Animal {
  id_animal: number;
  nombre: string;
  genero: boolean; // true = macho, false = hembra
  fecha_nacimiento: string;
  fecha_ingreso: string;
  procedencia: string;
  estado_operativo: 'Saludable' | 'En tratamiento' | 'En cuarentena' | 'Trasladado' | 'Fallecido';
  es_publico: boolean;
  descripcion: string;
  especie_id: number;
  habitat_id: number;
  especie: Especie;
  habitat: Habitat;
  media: MediaAnimal[];
}