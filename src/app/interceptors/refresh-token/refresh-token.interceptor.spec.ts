import { HttpErrorResponse, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Provider } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '@constants/app.constants';
import { environment } from '@environments/environment';
import { LogoutResponseDto } from '@features/auth/auth.models';
import { AuthApiService } from '@features/auth/services/auth-api.service';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take, throwError } from 'rxjs';

import { refreshTokenInterceptor } from './refresh-token.interceptor';

describe('refreshTokenInterceptor', () => {
  let storageServiceMock: MockProxy<StorageService>;
  let authApiServiceMock: MockProxy<AuthApiService>;
  let routerMock: MockProxy<Router>;
  const setFunctionMock = jest.fn();
  const cloneFnMock = jest.fn();
  const nextMock = jest.fn();
  let providers: Provider[];

  beforeEach(() => {
    storageServiceMock = mock<StorageService>();
    storageServiceMock.remove$.mockReturnValue(of(undefined));

    authApiServiceMock = mock<AuthApiService>();
    authApiServiceMock.logout$.mockReturnValue(of({} as LogoutResponseDto));
    authApiServiceMock.refreshToken$.mockReturnValue(of('newToken'));

    routerMock = mock<Router>();

    providers = [
      {
        provide: StorageService,
        useValue: storageServiceMock,
      },
      {
        provide: AuthApiService,
        useValue: authApiServiceMock,
      },
      {
        provide: Router,
        useValue: routerMock,
      },
    ];
  });

  describe('Refresh token error', () => {
    beforeEach(() => {
      nextMock.mockImplementation(() => throwError(() => new Error('error')));
    });

    it('should trigger "logout$" method of api service if error received for refresh token', () => {
      const reqMock = { url: environment.endpoints.auth.refreshToken } as any;

      const interceptor$ = runFnInContext(providers, () => refreshTokenInterceptor(reqMock, nextMock));
      interceptor$.pipe(take(1)).subscribe();

      expect(authApiServiceMock.logout$).toHaveBeenCalledTimes(1);
    });

    it('should trigger "logout$" method of api service if error received for refresh token', () => {
      const reqMock = { url: environment.endpoints.auth.refreshToken } as any;

      const interceptor$ = runFnInContext(providers, () => refreshTokenInterceptor(reqMock, nextMock));
      interceptor$.pipe(take(1)).subscribe();

      expect(storageServiceMock.remove$).toHaveBeenCalledWith(AppConstants.tokenStorageKey);
    });

    it('should navigate to root router', () => {
      const reqMock = { url: environment.endpoints.auth.refreshToken } as any;

      const interceptor$ = runFnInContext(providers, () => refreshTokenInterceptor(reqMock, nextMock));
      interceptor$.pipe(take(1)).subscribe();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('Unathorized error', () => {
    beforeEach(() => {
      nextMock.mockImplementation(() =>
        throwError(() => new HttpErrorResponse({ status: HttpStatusCode.Unauthorized })),
      );
    });

    it('should trigger "refreshToken$" method of api service if unathorized error received', () => {
      const interceptor$ = runFnInContext(providers, () =>
        refreshTokenInterceptor({ url: '' } as HttpRequest<unknown>, nextMock),
      );
      interceptor$.pipe(take(1)).subscribe();

      expect(authApiServiceMock.refreshToken$).toHaveBeenCalledTimes(1);
    });

    it('should attach auth header to new request after token refreshing', () => {
      const reqMock = {
        url: '',
        clone: cloneFnMock.mockImplementation(function () {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          return this;
        }),
        headers: {
          set: setFunctionMock.mockImplementation(function () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return this;
          }),
        },
      } as any;

      const interceptor$ = runFnInContext(providers, () => refreshTokenInterceptor(reqMock, nextMock));
      interceptor$.pipe(take(1)).subscribe();

      expect(setFunctionMock).toHaveBeenCalledWith('Authorization', 'Bearer newToken');
    });

    it('should save new token to storage', () => {
      nextMock.mockImplementationOnce(() =>
        throwError(() => new HttpErrorResponse({ status: HttpStatusCode.Unauthorized })),
      );
      nextMock.mockImplementationOnce(() => of({}));

      const interceptor$ = runFnInContext(providers, () =>
        refreshTokenInterceptor({ url: '' } as HttpRequest<unknown>, nextMock),
      );
      interceptor$.pipe(take(1)).subscribe();

      expect(storageServiceMock.set).toHaveBeenCalledWith(AppConstants.tokenStorageKey, 'newToken');
    });
  });
});
