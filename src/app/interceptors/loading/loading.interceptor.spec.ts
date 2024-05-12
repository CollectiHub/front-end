import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Provider } from '@angular/core';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { LoaderService } from '@services/loader/loader.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';

import { loadingInterceptor } from './loading.interceptor';

describe('LoadingInteceptor', () => {
  let providers: Provider[];
  let loaderServiceMock: MockProxy<LoaderService>;
  let reqMock: HttpRequest<unknown>;
  const getContextMockFn = jest.fn();

  beforeEach(() => {
    loaderServiceMock = mock<LoaderService>();
    loaderServiceMock.showUntilCompleted$.mockImplementation(obs$ => obs$);

    reqMock = {
      context: {
        get: getContextMockFn,
      },
    } as any;

    providers = [
      {
        provide: LoaderService,
        useValue: loaderServiceMock,
      },
    ];
  });

  it('should wrap request in "showUntilCompleted$" observable if skipLoading is false', () => {
    const httpEventMock$ = of(mock<HttpEvent<unknown>>());
    const nextMock = () => httpEventMock$;
    getContextMockFn.mockReturnValue(false);

    const interceptor$ = runFnInContext(providers, () => loadingInterceptor(reqMock as HttpRequest<unknown>, nextMock));
    interceptor$.pipe(take(1)).subscribe();

    expect(loaderServiceMock.showUntilCompleted$).toHaveBeenCalledWith(httpEventMock$);
  });

  it('should not wrap request in "showUntilCompleted$" observable if skipLoading is true', () => {
    const httpEventMock$ = of(mock<HttpEvent<unknown>>());
    const nextMock = () => httpEventMock$;
    getContextMockFn.mockReturnValue(true);

    const interceptor$ = runFnInContext(providers, () => loadingInterceptor(reqMock, nextMock));
    interceptor$.pipe(take(1)).subscribe();

    expect(loaderServiceMock.showUntilCompleted$).not.toHaveBeenCalled();
  });
});
