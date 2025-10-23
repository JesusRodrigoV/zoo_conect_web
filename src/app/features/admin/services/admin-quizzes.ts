import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QuizAdapter, BackendQuizResponse, BackendQuizCreateRequest, BackendParticipacionTriviaResponse, BackendParticiparTriviaRequest } from '@adapters/quiz';
import { Quiz } from '@models/quiz';
import { environment } from '@env';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminQuizzes {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  private quizzesUrl = `${this.apiUrl}/trivia`;

  createQuiz(quizData: Omit<Quiz, 'idTrivia' | 'usuarioId'>): Observable<Quiz> {
    const createRequest = QuizAdapter.toCreateRequest(quizData);
    return this.http
      .post<BackendQuizResponse>(this.quizzesUrl, createRequest)
      .pipe(
        map((quiz) => QuizAdapter.fromBackend(quiz))
      );
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http
      .get<BackendQuizResponse[]>(this.quizzesUrl)
      .pipe(
        map((quizzes) => QuizAdapter.fromBackendList(quizzes))
      );
  }

  getQuizById(quizId: string): Observable<Quiz> {
    return this.http
      .get<BackendQuizResponse>(`${this.quizzesUrl}/${quizId}`)
      .pipe(
        map((quiz) => QuizAdapter.fromBackend(quiz))
      );
  }

  participarEnTrivia(triviaId: number, aciertos: number): Observable<any> {
    const participarRequest: BackendParticiparTriviaRequest = {
      trivia_id: triviaId,
      aciertos: aciertos
    };
    return this.http.post<BackendParticipacionTriviaResponse>(`${this.quizzesUrl}/participar`, participarRequest);
  }

  getParticipacionesByTriviaId(triviaId: string): Observable<any[]> {
    return this.http.get<BackendParticipacionTriviaResponse[]>(`${this.quizzesUrl}/${triviaId}/participaciones`);
  }

  updateQuiz(id: number, quizData: Partial<Omit<Quiz, 'idTrivia' | 'usuarioId'>>): Observable<Quiz> {
    return this.http
      .put<BackendQuizResponse>(`${this.quizzesUrl}/${id}`, quizData)
      .pipe(
        map((quiz) => QuizAdapter.fromBackend(quiz))
      );
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.quizzesUrl}/${id}`);
  }
}
