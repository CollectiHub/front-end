import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthSchemas } from '@features/auth.schemas';
import { ValidationService } from '@services/validation-service/validation.service';
import { Observable, map } from 'rxjs';

import { LoginBody, LoginResponseDto, RegisterResponseDto, RegistrationBody } from '../auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly validationService = inject(ValidationService);

  login$(body: LoginBody): Observable<string> {
    return this.httpClient.post<LoginResponseDto>(environment.endpoints.auth.login, body).pipe(
      map((res: LoginResponseDto) => this.validationService.validate(AuthSchemas.loginResponseDto, res)),
      map((res: LoginResponseDto) => res.data.accessToken),
    );
  }

  register$(body: RegistrationBody): Observable<RegisterResponseDto> {
    return this.httpClient
      .post<RegisterResponseDto>(environment.endpoints.auth.register, body)
      .pipe(map((res: RegisterResponseDto) => this.validationService.validate(AuthSchemas.registerResponseDto, res)));
  }

  refreshToken$(): Observable<void> {
    return this.httpClient.post<void>(environment.endpoints.auth.refreshToken, {});
  }

  logout$(): Observable<void> {
    return this.httpClient.post<void>(environment.endpoints.auth.logout, {});
  }
}
