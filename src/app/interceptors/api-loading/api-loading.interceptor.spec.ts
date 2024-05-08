import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Provider } from '@angular/core';
import { environment } from '@environments/environment';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { LoaderService } from '@services/loader/loader.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';

import { apiLoadingInterceptor } from './api-loading.interceptor';

describe('ApiLoadingInteceptor', () => {
  let providers: Provider[];
  let loaderServiceMock: MockProxy<LoaderService>;

  beforeEach(() => {
    loaderServiceMock = mock<LoaderService>();
    loaderServiceMock.showUntilCompleted$.mockImplementation(obs$ => obs$);

    providers = [
      {
        provide: LoaderService,
        useValue: loaderServiceMock,
      },
    ];
  });

  it('should wrap request in "showUntilCompleted$" observable if it is api request', () => {
    const httpEventMock$ = of(mock<HttpEvent<unknown>>());
    const nextMock = () => httpEventMock$;

    const interceptor$ = runFnInContext(providers, () =>
      apiLoadingInterceptor({ url: environment.endpoints.apiUrl } as HttpRequest<unknown>, nextMock),
    );
    interceptor$.pipe(take(1)).subscribe();

    expect(loaderServiceMock.showUntilCompleted$).toHaveBeenCalledWith(httpEventMock$);
  });

  it('should not wrap request in "showUntilCompleted$" observable if it is not api request', () => {
    const httpEventMock$ = of(mock<HttpEvent<unknown>>());
    const nextMock = () => httpEventMock$;

    const interceptor$ = runFnInContext(providers, () =>
      apiLoadingInterceptor({ url: 'notExisting' } as HttpRequest<unknown>, nextMock),
    );
    interceptor$.pipe(take(1)).subscribe();

    expect(loaderServiceMock.showUntilCompleted$).not.toHaveBeenCalled();
  });
});
