import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthSchemas } from '@features/auth/auth.schemas';
import { ValidationService } from '@services/validation/validation.service';
import { Observable, map } from 'rxjs';

import { AuthConstants } from '../auth.constants';
import {
  LoginBody,
  LogoutResponseDto,
  RegisterResponseDto,
  RegistrationBody,
  ResponseWithTokenDto,
} from '../auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly validationService = inject(ValidationService);

  login$(body: LoginBody): Observable<string> {
    const context = new HttpContext().set(AuthConstants.skipAuthContextToken, true);

    return this.httpClient.post<ResponseWithTokenDto>(environment.endpoints.auth.login, body, { context }).pipe(
      map((res: ResponseWithTokenDto) => this.validationService.validate(AuthSchemas.responseWithTokenDto, res)),
      map((res: ResponseWithTokenDto) => res.data.access_token),
    );
  }

  register$(body: RegistrationBody): Observable<RegisterResponseDto> {
    const context = new HttpContext().set(AuthConstants.skipAuthContextToken, true);

    return this.httpClient
      .post<RegisterResponseDto>(environment.endpoints.auth.register, body, { context })
      .pipe(map((res: RegisterResponseDto) => this.validationService.validate(AuthSchemas.registerResponseDto, res)));
  }

  refreshToken$(): Observable<string> {
    return this.httpClient.post<ResponseWithTokenDto>(environment.endpoints.auth.refreshToken, {}).pipe(
      map((res: ResponseWithTokenDto) => this.validationService.validate(AuthSchemas.responseWithTokenDto, res)),
      map((res: ResponseWithTokenDto) => res.data.access_token),
    );
  }

  logout$(): Observable<LogoutResponseDto> {
    return this.httpClient
      .post<LogoutResponseDto>(environment.endpoints.auth.logout, {})
      .pipe(map((res: LogoutResponseDto) => this.validationService.validate(AuthSchemas.logoutResponseDto, res)));
  }
}
