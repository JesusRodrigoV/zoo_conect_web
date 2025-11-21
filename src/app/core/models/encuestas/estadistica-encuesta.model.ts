export interface RespuestasPorOpcion {
  [opcion: string]: number;
}

export interface RespuestasPorPregunta {
  [preguntaId: string]: {
    pregunta: string;
    totalRespuestas: number;
    respuestasPorOpcion: RespuestasPorOpcion;
  };
}

export interface EstadisticaEncuesta {
  totalParticipaciones: number;
  participacionesCompletadas: number;
  porcentajeCompletitud: number;
  respuestasPorPregunta: RespuestasPorPregunta;
}