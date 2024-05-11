import { HttpClient } from '@angular/common/http';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ValidationService } from '@services/validation/validation.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UsersSchemas } from '../users.schemas';

import { UsersApiService } from './users-api.service';

describe('UsersApiService', () => {
  let service: UsersApiService;
  let httpClientMock: MockProxy<HttpClient>;
  let validationServiceMock: MockProxy<ValidationService>;

  const responseMock = { data: 'data', message: 'message' };

  beforeEach(() => {
    httpClientMock = mock<HttpClient>();
    httpClientMock.post.mockReturnValueOnce(of(responseMock));

    validationServiceMock = mock<ValidationService>();
    validationServiceMock.validate.mockReturnValue(responseMock);

    service = classWithProviders({
      token: UsersApiService,
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
        {
          provide: ValidationService,
          useValue: validationServiceMock,
        },
      ],
    });
  });

  describe('verifyEmail$', () => {
    it('should trigger "post" method with correct params', () => {
      service.verifyEmail$('code').subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.users.verifyEmail, { code: 'code' });
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service.verifyEmail$('code').subscribe(spy);

      expect(spy).toHaveBeenCalledWith(responseMock);
    });

    it('should validate response', () => {
      service.verifyEmail$('code').subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(UsersSchemas.verifyEmailResponseDto, responseMock);
    });
  });

  describe('requestPasswordReset$', () => {
    it('should trigger "post" method with correct params', () => {
      service.requestPasswordReset$('email').subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.users.requestPasswordReset, {
        email: 'email',
      });
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service.requestPasswordReset$('email').subscribe(spy);

      expect(spy).toHaveBeenCalledWith(responseMock);
    });

    it('should validate response', () => {
      service.requestPasswordReset$('email').subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.requestPasswordResetResponseDto,
        responseMock,
      );
    });
  });

  describe('verifyPasswordReset$', () => {
    const bodyMock = { code: '1', new_password: '1' };

    it('should trigger "post" method with correct params', () => {
      service.verifyPasswordReset$(bodyMock).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.users.verifyPasswordReset, bodyMock);
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service.verifyPasswordReset$(bodyMock).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(responseMock);
    });

    it('should validate response', () => {
      service.verifyPasswordReset$(bodyMock).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.verifyPasswordResetResponseDto,
        responseMock,
      );
    });
  });
});
