import { HttpClient, HttpContext } from '@angular/common/http';
import { AuthConstants } from '@features/auth/auth.constants';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ValidationService } from '@services/validation/validation.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ChangePasswordBody, UpdateUserBody } from '../users.models';
import { UsersSchemas } from '../users.schemas';

import { UsersApiService } from './users-api.service';

describe('UsersApiService', () => {
  let service: UsersApiService;
  let httpClientMock: MockProxy<HttpClient>;
  let validationServiceMock: MockProxy<ValidationService>;

  const genericResponseMock = { data: 'data', message: 'message' };
  const getResponseMock = { data: {}, message: 'message' };

  beforeEach(() => {
    httpClientMock = mock<HttpClient>();
    httpClientMock.post.mockReturnValue(of(genericResponseMock));
    httpClientMock.get.mockReturnValue(of(getResponseMock));
    httpClientMock.delete.mockReturnValue(of(genericResponseMock));
    httpClientMock.patch.mockReturnValue(of(genericResponseMock));

    validationServiceMock = mock<ValidationService>();
    validationServiceMock.validate.mockReturnValue(genericResponseMock);

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

  describe('getUserData$', () => {
    beforeEach(() => {
      validationServiceMock.validate.mockReturnValue(getResponseMock);
    });

    it('should trigger "get" method with correct params', () => {
      service.getUserData$().pipe(take(1)).subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith(environment.endpoints.users.getUserData);
    });

    it('should emit data of received response', () => {
      const spy = jest.fn();

      service.getUserData$().subscribe(spy);

      expect(spy).toHaveBeenCalledWith({});
    });

    it('should validate response', () => {
      service.getUserData$().pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.getUserDataResponseSchema,
        getResponseMock,
      );
    });
  });

  describe('deleteUser$', () => {
    beforeEach(() => {
      validationServiceMock.validate.mockReturnValue(genericResponseMock);
    });

    it('should trigger "delete" method with correct params', () => {
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

      service.deleteUser$().pipe(take(1)).subscribe();

      expect(httpClientMock.delete).toHaveBeenCalledWith(environment.endpoints.users.base, { context: contextMock });
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service.deleteUser$().pipe(take(1)).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(genericResponseMock);
    });

    it('should validate response', () => {
      service.deleteUser$().pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.deleteUserResponseDto,
        genericResponseMock,
      );
    });
  });

  describe('updateUserData$', () => {
    beforeEach(() => {
      validationServiceMock.validate.mockReturnValue(genericResponseMock);
    });

    it('should trigger "patch" method with correct params', () => {
      service
        .updateUserData$({} as UpdateUserBody)
        .pipe(take(1))
        .subscribe();

      expect(httpClientMock.patch).toHaveBeenCalledWith(environment.endpoints.users.base, {});
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service
        .updateUserData$({} as UpdateUserBody)
        .pipe(take(1))
        .subscribe(spy);

      expect(spy).toHaveBeenCalledWith(genericResponseMock);
    });

    it('should validate response', () => {
      service
        .updateUserData$({} as UpdateUserBody)
        .pipe(take(1))
        .subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.updateUserResponseDto,
        genericResponseMock,
      );
    });
  });

  describe('changePassword$', () => {
    beforeEach(() => {
      validationServiceMock.validate.mockReturnValue(genericResponseMock);
    });

    it('should trigger "patch" method with correct params', () => {
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

      service
        .changePassword$({} as ChangePasswordBody)
        .pipe(take(1))
        .subscribe();

      expect(httpClientMock.patch).toHaveBeenCalledWith(
        environment.endpoints.users.changePassword,
        {},
        { context: contextMock },
      );
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service
        .changePassword$({} as ChangePasswordBody)
        .pipe(take(1))
        .subscribe(spy);

      expect(spy).toHaveBeenCalledWith(genericResponseMock);
    });

    it('should validate response', () => {
      service
        .changePassword$({} as ChangePasswordBody)
        .pipe(take(1))
        .subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.changePasswordResponseDto,
        genericResponseMock,
      );
    });
  });

  describe('verifyEmail$', () => {
    it('should trigger "post" method with correct params', () => {
      service.verifyEmail$('code').pipe(take(1)).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.users.verifyEmail, { code: 'code' });
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service.verifyEmail$('code').pipe(take(1)).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(genericResponseMock);
    });

    it('should validate response', () => {
      service.verifyEmail$('code').pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.verifyEmailResponseDto,
        genericResponseMock,
      );
    });
  });

  describe('requestPasswordReset$', () => {
    it('should trigger "post" method with correct params', () => {
      service.requestPasswordReset$('email').pipe(take(1)).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.users.requestPasswordReset, {
        email: 'email',
      });
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service.requestPasswordReset$('email').pipe(take(1)).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(genericResponseMock);
    });

    it('should validate response', () => {
      service.requestPasswordReset$('email').pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.requestPasswordResetResponseDto,
        genericResponseMock,
      );
    });
  });

  describe('verifyPasswordReset$', () => {
    const bodyMock = { code: '1', new_password: '1' };

    it('should trigger "post" method with correct params', () => {
      service.verifyPasswordReset$(bodyMock).pipe(take(1)).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.users.verifyPasswordReset, bodyMock);
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service.verifyPasswordReset$(bodyMock).pipe(take(1)).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(genericResponseMock);
    });

    it('should validate response', () => {
      service.verifyPasswordReset$(bodyMock).pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.verifyPasswordResetResponseDto,
        genericResponseMock,
      );
    });
  });

  describe('resendVerificationEmail$', () => {
    it('should trigger "post" method with correct params', () => {
      service.resendVerificationEmail$().pipe(take(1)).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith(environment.endpoints.users.resendVerificationEmail, {});
    });

    it('should emit received response', () => {
      const spy = jest.fn();

      service.resendVerificationEmail$().pipe(take(1)).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(genericResponseMock);
    });

    it('should validate response', () => {
      service.resendVerificationEmail$().pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        UsersSchemas.resendVerificationEmailResponseDto,
        genericResponseMock,
      );
    });
  });
});
