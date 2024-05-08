import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { ValidationService } from '@services/validation/validation.service';
import { Observable, map } from 'rxjs';

import { VerifyEmailResponseDto } from '../users.models';
import { UsersSchemas } from '../users.schemas';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly validationService = inject(ValidationService);

  verifyEmail$(code: string): Observable<VerifyEmailResponseDto> {
    return this.httpClient
      .post<VerifyEmailResponseDto>(environment.endpoints.users.verifyEmail, { code })
      .pipe(
        map((res: VerifyEmailResponseDto) => this.validationService.validate(UsersSchemas.verifyEmailResponseDto, res)),
      );
  }
}
