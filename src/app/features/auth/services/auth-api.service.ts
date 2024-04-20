import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthSchemas } from '@features/auth.schemas';
import { ValidationService } from '@services/validation-service/validation.service';
import { Observable, map } from 'rxjs';

import { AuthConstants } from '../auth.constants';
import { LoginBody, LoginResponseDto, RegisterResponseDto, RegistrationBody } from '../auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly validationService = inject(ValidationService);

  login$(body: LoginBody): Observable<string> {
    const context = new HttpContext().set(AuthConstants.skipAuthContextToken, true);

    return this.httpClient.post<LoginResponseDto>(environment.endpoints.auth.login, body, { context }).pipe(
      map((res: LoginResponseDto) => this.validationService.validate(AuthSchemas.loginResponseDto, res)),
      map((res: LoginResponseDto) => res.data.accessToken),
    );
  }

  register$(body: RegistrationBody): Observable<RegisterResponseDto> {
    const context = new HttpContext().set(AuthConstants.skipAuthContextToken, true);

    return this.httpClient
      .post<RegisterResponseDto>(environment.endpoints.auth.register, body, { context })
      .pipe(map((res: RegisterResponseDto) => this.validationService.validate(AuthSchemas.registerResponseDto, res)));
  }

  refreshToken$(): Observable<void> {
    return this.httpClient.post<void>(environment.endpoints.auth.refreshToken, {});
  }

  logout$(): Observable<void> {
    return this.httpClient.post<void>(environment.endpoints.auth.logout, {});
  }
}
