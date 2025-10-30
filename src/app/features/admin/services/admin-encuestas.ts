import {
  BackendEncuestaResponse,
  BackendStatsResponse,
  EncuestaAdapter,
  EstadisticaEncuestaAdapter,
} from "@adapters/encuesta";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Encuesta } from "@app/core/models/encuestas/encuesta.model";
import { environment } from "@env";
import { EstadisticaEncuesta } from "@models/encuestas";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminEncuestas {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  private surveysUrl = `${this.apiUrl}/surveys`;
  private encuestasUrl = `${this.surveysUrl}/surveys`;

  createSurvey(surveyData: any) {
    return this.http.post<any>(this.encuestasUrl, surveyData);
  }

  getAllSurveys(skip: number = 0, limit: number = 10): Observable<Encuesta[]> {
    return this.http
      .get<BackendEncuestaResponse[]>(this.encuestasUrl, {
        params: { skip, limit },
      })
      .pipe(
        map((surveys) =>
          surveys.map((survey) => EncuestaAdapter.fromBackend(survey)),
        ),
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

  updateSurvey(id: number, surveyData: any) {
    return this.http.put(`${this.encuestasUrl}/${id}`, surveyData);
  }

  deleteSurvey(id: number) {
    return this.http.delete(`${this.encuestasUrl}/${id}`);
  }
}
