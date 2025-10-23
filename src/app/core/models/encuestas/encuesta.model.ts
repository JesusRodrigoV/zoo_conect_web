export interface OpcionPregunta {
  idOpcion: number;
  textoOpcion: string;
  orden: number;
}

export interface Pregunta {
  idPregunta: number;
  textoPregunta: string;
  esOpcionUnica: boolean;
  orden: number;
  opciones: OpcionPregunta[];
}

export interface Encuesta {
  idEncuesta: number;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  isActive: boolean;
  preguntas: Pregunta[];
}