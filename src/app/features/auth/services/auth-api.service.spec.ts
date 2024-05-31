import { HttpClient, HttpContext } from '@angular/common/http';
import { AuthSchemas } from '@features/auth/auth.schemas';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ValidationService } from '@services/validation/validation.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthConstants } from '../auth.constants';
import { LoginBody, RegistrationBody } from '../auth.models';

import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpClientMock: MockProxy<HttpClient>;
  let validationServiceMock: MockProxy<ValidationService>;

  beforeEach(() => {
    httpClientMock = mock<HttpClient>();

    validationServiceMock = mock<ValidationService>();

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
    const responseMock = { data: { access_token: 'token' } };

    beforeEach(() => {
      httpClientMock.post.mockReturnValueOnce(of(responseMock));
      validationServiceMock.validate.mockReturnValue(responseMock);
    });

    it('should trigger "post" method with correct params', () => {
      const contextMock = new HttpContext().set(AuthConstants.skipAuthContextToken, true);

      service.login$({} as LoginBody).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.auth.login, {}, { context: contextMock });
    });

    it('should emit "accessToken" property of responses', () => {
      const spy = jest.fn();

      service.login$({} as LoginBody).subscribe(spy);

      expect(spy).toHaveBeenCalledWith('token');
    });

    it('should validate response', () => {
      service.login$({} as LoginBody).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(AuthSchemas.loginResponseDto, responseMock);
    });
  });

  describe('register$', () => {
    const responseMock = { data: { access_token: 'token' } };

    beforeEach(() => {
      httpClientMock.post.mockReturnValueOnce(of(responseMock));
      validationServiceMock.validate.mockReturnValue(responseMock);
    });

    it('should trigger "post" method with correct params', () => {
      const contextMock = new HttpContext()
        .set(AuthConstants.skipAuthContextToken, true)
        .set(AuthConstants.skipLoadingContextToken, true);

      service.register$({} as RegistrationBody).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(
        environment.endpoints.auth.register,
        {},
        { context: contextMock },
      );
    });

    it('should emit token from response', () => {
      const spy = jest.fn();

      service.register$({} as RegistrationBody).subscribe(spy);

      expect(spy).toHaveBeenCalledWith('token');
    });

    it('should validate response', () => {
      service.register$({} as RegistrationBody).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(AuthSchemas.registerResponseDto, responseMock);
    });
  });

  describe('refreshToken$', () => {
    const responseMock = { data: { access_token: 'token' } };

    beforeEach(() => {
      httpClientMock.post.mockReturnValueOnce(of(responseMock));
      validationServiceMock.validate.mockReturnValue(responseMock);
    });

    it('should trigger "post" method with correct params', () => {
      service.refreshToken$().subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.auth.refreshToken, {});
    });

    it('should emit "access_token" property', () => {
      const spy = jest.fn();

      service.refreshToken$().subscribe(spy);

      expect(spy).toHaveBeenCalledWith('token');
    });

    it('should validate response', () => {
      service.refreshToken$().subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(AuthSchemas.refreshTokenResponseDto, responseMock);
    });
  });

  describe('logout$', () => {
    const responseMock = { data: '', message: '' };

    beforeEach(() => {
      httpClientMock.post.mockReturnValueOnce(of(responseMock));
      validationServiceMock.validate.mockReturnValue(responseMock);
    });

    it('should trigger "post" method with correct params', () => {
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

      service.logout$().subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.auth.logout, {}, { context: contextMock });
    });

    it('should emit response dto', () => {
      const spy = jest.fn();

      httpClientMock.post.mockReturnValueOnce(of(responseMock));

      service.logout$().subscribe(spy);

      expect(spy).toHaveBeenCalledWith(responseMock);
    });

    it('should validate response', () => {
      service.logout$().subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(AuthSchemas.logoutResponseDto, responseMock);
    });
  });
});
