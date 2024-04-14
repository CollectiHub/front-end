import { HttpClient } from '@angular/common/http';
import { AuthSchemas } from '@features/auth.schemas';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ValidationService } from '@services/validation-service/validation.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginBody, RegistrationBody } from '../auth.models';

import { AuthApiService } from './auth-api.service';

describe('AuthService', () => {
  let service: AuthApiService;
  let httpClientMock: MockProxy<HttpClient>;
  let validationServiceMock: MockProxy<ValidationService>;

  beforeEach(() => {
    httpClientMock = mock<HttpClient>();
    httpClientMock.post.mockReturnValue(of({}));

    validationServiceMock = mock<ValidationService>();
    validationServiceMock.validate.mockReturnValue({});

    service = classWithProviders({
      token: AuthApiService,
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

  describe('login$', () => {
    it('should trigger "post" method with correct params', () => {
      service.login$({} as LoginBody).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.auth.login, {});
    });

    it('should emit "accessToken" property of responses', () => {
      const spy = jest.fn();
      const responseMock = { data: { accessToken: 'token' } };
      httpClientMock.post.mockReturnValueOnce(of(responseMock));
      validationServiceMock.validate.mockReturnValue(responseMock);

      service.login$({} as LoginBody).subscribe(spy);

      expect(spy).toHaveBeenCalledWith('token');
    });

    it('should validate response', () => {
      service.login$({} as LoginBody).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(AuthSchemas.loginResponseDto, {});
    });
  });

  describe('register$', () => {
    it('should trigger "post" method with correct params', () => {
      service.register$({} as RegistrationBody).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.auth.register, {});
    });

    it('should emit response received from API', () => {
      const spy = jest.fn();
      httpClientMock.post.mockReturnValueOnce(of({}));

      service.register$({} as RegistrationBody).subscribe(spy);

      expect(spy).toHaveBeenCalledWith({});
    });

    it('should validate response', () => {
      service.register$({} as RegistrationBody).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(AuthSchemas.registerResponseDto, {});
    });
  });

  describe('refreshToken$', () => {
    it('should trigger "post" method with correct params', () => {
      service.refreshToken$().subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.auth.refreshToken, {});
    });

    it('should emit undefined', () => {
      const spy = jest.fn();
      httpClientMock.post.mockReturnValueOnce(of(undefined));

      service.refreshToken$().subscribe(spy);

      expect(spy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('logout$', () => {
    it('should trigger "post" method with correct params', () => {
      service.logout$().subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.auth.logout, {});
    });

    it('should emit undefined', () => {
      const spy = jest.fn();
      httpClientMock.post.mockReturnValueOnce(of(undefined));

      service.logout$().subscribe(spy);

      expect(spy).toHaveBeenCalledWith(undefined);
    });
  });
});
