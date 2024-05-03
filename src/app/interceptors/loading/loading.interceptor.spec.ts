import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Provider } from '@angular/core';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { LoaderService } from '@services/loader/loader.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';

import { loadingInterceptor } from './loading.interceptor';

describe('loadingInteceptor', () => {
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

  it('should wrape request in "showUntilCompleted$" observable', () => {
    const httpEventMock$ = of(mock<HttpEvent<unknown>>());
    const nextMock = () => httpEventMock$;

    const interceptor$ = runFnInContext(providers, () => loadingInterceptor({} as HttpRequest<unknown>, nextMock));
    interceptor$.pipe(take(1)).subscribe();

    expect(loaderServiceMock.showUntilCompleted$).toHaveBeenCalledWith(httpEventMock$);
  });
});
