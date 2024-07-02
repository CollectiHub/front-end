import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthSchemas } from '@features/auth/auth.schemas';
import { GenericApiResponse } from '@models/api.models';
import { ValidationService } from '@services/validation/validation.service';
import { Observable, map } from 'rxjs';

import { AuthConstants } from '../../auth.constants';
import { LoginBody, RegistrationBody, ResponseWithTokenDto } from '../../auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly validationService = inject(ValidationService);

  login$(body: LoginBody): Observable<string> {
    const context = new HttpContext()
      .set(AuthConstants.skipAuthContextToken, true)
      .set(AuthConstants.skipLoadingContextToken, true);

    return this.httpClient.post<ResponseWithTokenDto>(environment.endpoints.auth.login, body, { context }).pipe(
      map((res: ResponseWithTokenDto) => this.validationService.validate(AuthSchemas.loginResponseDto, res)),
      map((res: ResponseWithTokenDto) => res.data.access_token),
    );
  }

  register$(body: RegistrationBody): Observable<string> {
    const context = new HttpContext()
      .set(AuthConstants.skipAuthContextToken, true)
      .set(AuthConstants.skipLoadingContextToken, true);

    return this.httpClient.post<ResponseWithTokenDto>(environment.endpoints.auth.register, body, { context }).pipe(
      map((res: ResponseWithTokenDto) => this.validationService.validate(AuthSchemas.registerResponseDto, res)),
      map((res: ResponseWithTokenDto) => res.data.access_token),
    );
  }

  refreshToken$(): Observable<string> {
    return this.httpClient.post<ResponseWithTokenDto>(environment.endpoints.auth.refreshToken, {}).pipe(
      map((res: ResponseWithTokenDto) => this.validationService.validate(AuthSchemas.refreshTokenResponseDto, res)),
      map((res: ResponseWithTokenDto) => res.data.access_token),
    );
  }

  logout$(): Observable<GenericApiResponse> {
    const context = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

    return this.httpClient
      .post<GenericApiResponse>(environment.endpoints.auth.logout, {}, { context })
      .pipe(map((res: GenericApiResponse) => this.validationService.validate(AuthSchemas.logoutResponseDto, res)));
  }
}
