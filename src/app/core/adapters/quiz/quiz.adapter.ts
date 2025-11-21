import { Quiz } from "@models/quiz";

export interface BackendQuizResponse {
  id_trivia: number;
  fecha_trivia: string;
  cantidad_preguntas: number;
  dificultad: string;
  usuario_id: number;
}

export interface BackendQuizCreateRequest {
  fecha_trivia: string;
  cantidad_preguntas: number;
  dificultad: string;
}

export interface BackendParticipacionTriviaResponse {
  id_participacion_trivia: number;
  usuario_id: number;
  aciertos: number;
  fecha_trivia: string;
  trivia_id: number;
}

export interface BackendParticiparTriviaRequest {
  trivia_id: number;
  aciertos: number;
}

export class QuizAdapter {
  static fromBackend(backendQuiz: BackendQuizResponse): Quiz {
    return {
      idTrivia: backendQuiz.id_trivia,
      fechaTrivia: backendQuiz.fecha_trivia,
      cantidadPreguntas: backendQuiz.cantidad_preguntas,
      dificultad: backendQuiz.dificultad,
      usuarioId: backendQuiz.usuario_id
    };
  }

  static fromBackendList(backendQuizzes: BackendQuizResponse[]): Quiz[] {
    return backendQuizzes.map(quiz => this.fromBackend(quiz));
  }

  static toCreateRequest(quiz: Omit<Quiz, 'idTrivia' | 'usuarioId'>): BackendQuizCreateRequest {
    return {
      fecha_trivia: quiz.fechaTrivia,
      cantidad_preguntas: quiz.cantidadPreguntas,
      dificultad: quiz.dificultad
    };
  }
}