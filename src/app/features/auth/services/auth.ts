import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginResponse, LogoutRequest, LogoutResponse, RegisterRequest } from '../../../core/models/usuario/request_response.model';
import { Usuario } from '../../../core/models/usuario/usuario.model';
import { UsuarioAdapter } from '../adapters/usuario.adapter';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}`;
  private readonly authUrl = `${this.apiUrl}/auth`;

  register(email: string, username: string, password: string): Observable<Usuario> {
    const registerData: RegisterRequest = { email, username, password };
    return this.http.post<any>(`${this.authUrl}/register`, registerData)
      .pipe(
        map(backendUser => UsuarioAdapter.fromBackend(backendUser))
      );
  }

  login(email: string, password: string) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, { email, password });
  }

  logout(refreshToken: string): Observable<LogoutResponse> {
    const logoutData: LogoutRequest = { refresh_token: refreshToken };
    return this.http.post<LogoutResponse>(`${this.authUrl}/logout`, logoutData);
  }

  getProfile(): Observable<Usuario> {
    return this.http.get<any>(`${this.authUrl}/me`)
      .pipe(
        map(backendUser => UsuarioAdapter.fromBackend(backendUser))
      );
  }

  refreshToken(refreshToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/refresh`, {
      refresh_token: refreshToken
    });
  }
}
