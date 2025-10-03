import { EstadisticaEncuesta, RespuestasPorPregunta } from "../models/estadistica-encuesta.model";

export class EstadisticaEncuestaAdapter {
  static fromBackend(backendStats: BackendStatsResponse): EstadisticaEncuesta {
    return {
      totalParticipaciones: backendStats.total_participaciones,
      participacionesCompletadas: backendStats.participaciones_completadas,
      porcentajeCompletitud: backendStats.porcentaje_completitud,
      respuestasPorPregunta: backendStats.respuestas_por_pregunta
    };
  }
}

export interface BackendStatsResponse {
  total_participaciones: number;
  participaciones_completadas: number;
  porcentaje_completitud: number;
  respuestas_por_pregunta: RespuestasPorPregunta;
}