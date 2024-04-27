import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Provider } from '@angular/core';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';

import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let providers: Provider[];
  let reqMock: HttpRequest<unknown>;
  let nextMock: HttpHandlerFn;
  let storageServiceMock: MockProxy<StorageService>;
  const setFunctionMock = jest.fn();
  const getContextMockFn = jest.fn();

  beforeEach(() => {
    storageServiceMock = mock<StorageService>();
    reqMock = {
      clone: jest.fn().mockImplementation(function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return this;
      }),
      context: {
        get: getContextMockFn,
      },
      headers: {
        set: setFunctionMock.mockImplementation(function () {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          return this;
        }),
      },
    } as any;

    nextMock = () => of(mock<HttpEvent<unknown>>());

    providers = [
      {
        provide: StorageService,
        useValue: storageServiceMock,
      },
    ];
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should attach "Authorization" header if token exists and skipAuth is false', () => {
    storageServiceMock.get$.mockReturnValueOnce(of('token'));
    getContextMockFn.mockReturnValue(false);

    const interceptor$ = runFnInContext(providers, () => authInterceptor(reqMock, nextMock));
    interceptor$.pipe(take(1)).subscribe();

    expect(reqMock.headers.set).toHaveBeenCalledWith('Authorization', 'Bearer token');
  });

  it('should attach "withCredentials" with true value if skipAuth is false', () => {
    storageServiceMock.get$.mockReturnValueOnce(of('token'));
    getContextMockFn.mockReturnValue(false);

    const interceptor$ = runFnInContext(providers, () => authInterceptor(reqMock, nextMock));
    interceptor$.pipe(take(1)).subscribe();

    expect(reqMock.clone).toHaveBeenCalledWith({ withCredentials: true });
  });

  it('should attach "withCredentials" with false value if skipAuth is true', () => {
    storageServiceMock.get$.mockReturnValueOnce(of('token'));
    getContextMockFn.mockReturnValue(true);

    const interceptor$ = runFnInContext(providers, () => authInterceptor(reqMock, nextMock));
    interceptor$.pipe(take(1)).subscribe();

    expect(reqMock.clone).toHaveBeenCalledWith({ withCredentials: false });
  });

  it('should not attach "Authorization" if token not exists and skipAuth is false', () => {
    storageServiceMock.get$.mockReturnValueOnce(of(undefined));
    getContextMockFn.mockReturnValue(false);

    const interceptor$ = runFnInContext(providers, () => authInterceptor(reqMock, nextMock));
    interceptor$.pipe(take(1)).subscribe();

    expect(reqMock.headers.set).not.toHaveBeenCalledWith('Authorization', 'Bearer token');
  });

  it('should not attach "Authorization" if token not exists and skipAuth is true', () => {
    storageServiceMock.get$.mockReturnValueOnce(of(undefined));
    getContextMockFn.mockReturnValue(true);

    const interceptor$ = runFnInContext(providers, () => authInterceptor(reqMock, nextMock));
    interceptor$.pipe(take(1)).subscribe();

    expect(reqMock.headers.set).not.toHaveBeenCalledWith('Authorization', 'Bearer token');
  });
});
