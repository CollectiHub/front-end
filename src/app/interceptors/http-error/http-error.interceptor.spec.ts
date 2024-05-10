import { HttpRequest } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AppConstants } from '@constants/app.constants';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { ToastService } from '@services/toast/toast.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take, throwError } from 'rxjs';

import { httpErrorInterceptor } from './http-error.interceptor';

describe('httpErrorInterceptor', () => {
  let providers: Provider[];
  let toastServiceMock: MockProxy<ToastService>;
  const errorMock = {
    error: {
      message: 'error',
    },
  };

  beforeEach(() => {
    toastServiceMock = mock<ToastService>({ open$: jest.fn(() => of({} as any)) });

    providers = [
      {
        provide: ToastService,
        useValue: toastServiceMock,
      },
    ];
  });

  it('should trigger "open$" method of toastService when error received', () => {
    const nextMock = jest.fn(() => throwError(() => errorMock));
    const expectedConfig = {
      duration: AppConstants.toastDuration,
      cssClass: 'app-toast',
      message: 'error',
      position: 'bottom',
    };

    const interceptor$ = runFnInContext(providers, () => httpErrorInterceptor({} as HttpRequest<unknown>, nextMock));
    interceptor$.pipe(take(1)).subscribe();

    expect(toastServiceMock.open$).toHaveBeenCalledWith(expectedConfig);
  });

  it('should throw an error when error received during API call', () => {
    const spy = jest.fn();
    const nextMock = jest.fn(() => throwError(() => errorMock));

    const interceptor$ = runFnInContext(providers, () => httpErrorInterceptor({} as HttpRequest<unknown>, nextMock));
    interceptor$.pipe(take(1)).subscribe({ error: spy });

    expect(spy).toHaveBeenCalledWith(errorMock);
  });
});
