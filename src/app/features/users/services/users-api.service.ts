import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthConstants } from '@features/auth/auth.constants';
import { GenericApiResponse } from '@models/api.models';
import { ValidationService } from '@services/validation/validation.service';
import { Observable, map } from 'rxjs';

import {
  ChangePasswordBody,
  UpdateUserBody,
  UserDataDto,
  UserDataResponseDto,
  VerifyPasswordResetBody,
} from '../users.models';
import { UsersSchemas } from '../users.schemas';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly validationService = inject(ValidationService);

  getUserData$(token?: string): Observable<UserDataDto> {
    const options = this.buildGetUserDataOption(token);

    return this.httpClient.get<UserDataResponseDto>(environment.endpoints.users.getUserData, options).pipe(
      map((res: UserDataResponseDto) => this.validationService.validate(UsersSchemas.getUserDataResponseSchema, res)),
      map((res: UserDataResponseDto) => res.data),
    );
  }

  deleteUser$(): Observable<GenericApiResponse> {
    const context = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

    return this.httpClient
      .delete<GenericApiResponse>(environment.endpoints.users.base, { context })
      .pipe(map((res: GenericApiResponse) => this.validationService.validate(UsersSchemas.deleteUserResponseDto, res)));
  }

  updateUserData$(body: UpdateUserBody): Observable<GenericApiResponse> {
    return this.httpClient
      .patch<GenericApiResponse>(environment.endpoints.users.base, body)
      .pipe(map((res: GenericApiResponse) => this.validationService.validate(UsersSchemas.updateUserResponseDto, res)));
  }

  changePassword$(body: ChangePasswordBody): Observable<GenericApiResponse> {
    const context = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

    return this.httpClient
      .patch<GenericApiResponse>(environment.endpoints.users.changePassword, body, { context })
      .pipe(
        map((res: GenericApiResponse) => this.validationService.validate(UsersSchemas.changePasswordResponseDto, res)),
      );
  }

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

  resendVerificationEmail$(): Observable<GenericApiResponse> {
    return this.httpClient
      .post<GenericApiResponse>(environment.endpoints.users.resendVerificationEmail, {})
      .pipe(
        map((res: GenericApiResponse) =>
          this.validationService.validate(UsersSchemas.resendVerificationEmailResponseDto, res),
        ),
      );
  }

  private buildGetUserDataOption(token?: string) {
    if (!token) return {};

    const context = new HttpContext().set(AuthConstants.skipAuthContextToken, true);
    const headers = new HttpHeaders().set('Authorization', token);

    return {
      headers,
      context,
      withCredentials: true,
    };
  }
}
