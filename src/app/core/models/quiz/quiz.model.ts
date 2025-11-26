import { z } from "zod";

export enum DificultadTrivia {
  FACIL = "Fácil",
  MEDIO = "Medio",
  DIFICIL = "Difícil",
}

export interface Trivia {
  id: number;
  fecha: string;
  cantidadPreguntas: number;
  dificultad: DificultadTrivia | string;
  usuarioId: number;
}

export type CreateTrivia = Omit<Trivia, "id" | "usuarioId">;

export interface ParticipacionTrivia {
  id: number;
  usuarioId: number;
  aciertos: number;
  fecha: string;
  triviaId: number;
}

export type CreateParticipacion = Pick<
  ParticipacionTrivia,
  "triviaId" | "aciertos"
>;

export interface GeneratedQuestion {
  id?: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
  explicacion: string;
}

export interface GeneratedQuiz {
  titulo: string;
  dificultad: string;
  tema: string;
  preguntas: GeneratedQuestion[];
}

export const QuizSchema = z.object({
  titulo: z.string(),
  dificultad: z.string(),
  tema: z.string(),
  preguntas: z.array(
    z.object({
      id: z.number().optional(),
      pregunta: z.string(),
      opciones: z.array(z.string()),
      respuestaCorrecta: z.string(),
      explicacion: z.string(),
    }),
  ),
});

export const QuizJsonSchema = z.toJSONSchema(QuizSchema);
