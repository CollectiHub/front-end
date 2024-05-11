import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { GenericApiResponse } from '@models/api.models';
import { ValidationService } from '@services/validation/validation.service';
import { Observable, map } from 'rxjs';

import { VerifyPasswordResetBody } from '../users.models';
import { UsersSchemas } from '../users.schemas';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly validationService = inject(ValidationService);

  verifyEmail$(code: string): Observable<GenericApiResponse> {
    return this.httpClient
      .post<GenericApiResponse>(environment.endpoints.users.verifyEmail, { code })
      .pipe(
        map((res: GenericApiResponse) => this.validationService.validate(UsersSchemas.verifyEmailResponseDto, res)),
      );
  }

  requestPasswordReset$(email: string): Observable<GenericApiResponse> {
    return this.httpClient
      .post<GenericApiResponse>(environment.endpoints.users.requestPasswordReset, { email })
      .pipe(
        map((res: GenericApiResponse) =>
          this.validationService.validate(UsersSchemas.requestPasswordResetResponseDto, res),
        ),
      );
  }

  verifyPasswordReset$(body: VerifyPasswordResetBody): Observable<GenericApiResponse> {
    return this.httpClient
      .post<GenericApiResponse>(environment.endpoints.users.verifyPasswordReset, body)
      .pipe(
        map((res: GenericApiResponse) =>
          this.validationService.validate(UsersSchemas.verifyPasswordResetResponseDto, res),
        ),
      );
  }
}
