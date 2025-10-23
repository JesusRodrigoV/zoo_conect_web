import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, map } from 'rxjs';
import { 
  EncuestaAdapter, 
  BackendEncuestaResponse 
} from '@adapters/encuesta';
import { 
  EstadisticaEncuestaAdapter,
  BackendStatsResponse 
} from '@adapters/encuesta';
import { EstadisticaEncuesta } from '@models/encuestas';
import { Encuesta } from '@models/encuestas';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  private encuestasUrl = `${this.apiUrl}/surveys`;

  getSurveys(skip: number = 0, limit: number = 10): Observable<Encuesta[]> {
    return this.http
      .get<BackendEncuestaResponse[]>(this.encuestasUrl, {
        params: { skip, limit },
      })
      .pipe(
        map((surveys) =>
          surveys.map((survey) => EncuestaAdapter.fromBackend(survey))
        )
      );
  }

  getSurveyById(surveyId: string): Observable<Encuesta> {
    return this.http
      .get<BackendEncuestaResponse>(`${this.encuestasUrl}/${surveyId}`)
      .pipe(map((survey) => EncuestaAdapter.fromBackend(survey)));
  }

  getStatsBySurveyId(surveyId: string): Observable<EstadisticaEncuesta> {
    return this.http
      .get<BackendStatsResponse>(`${this.encuestasUrl}/${surveyId}/stats`)
      .pipe(map((stats) => EstadisticaEncuestaAdapter.fromBackend(stats)));
  }
}
