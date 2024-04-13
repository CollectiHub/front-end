import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginBody, LoginResponseDto, RegisterResponseDto, RegistrationBody } from '../auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  login$(body: LoginBody): Observable<string> {
    return this.httpClient
      .post<LoginResponseDto>(environment.endpoints.auth.login, body)
      .pipe(map((res: LoginResponseDto) => res.data.accessToken));
  }

  register$(body: RegistrationBody): Observable<RegisterResponseDto> {
    return this.httpClient.post<RegisterResponseDto>(environment.endpoints.auth.register, body);
  }

  refreshToken$(): Observable<void> {
    return this.httpClient.post<void>(environment.endpoints.auth.refreshToken, {});
  }

  logout$(): Observable<void> {
    return this.httpClient.post<void>(environment.endpoints.auth.logout, {});
  }
}
