import { Provider } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { StorageService } from '@services/storage-service/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { Observable, of, take } from 'rxjs';

import { authGuard } from './auth.guard';

describe('AuthGuard', () => {
  let storageSerivceMock: MockProxy<StorageService>;
  let routerMock: MockProxy<Router>;
  let providers: Provider[];

  beforeEach(() => {
    storageSerivceMock = mock<StorageService>();
    routerMock = mock<Router>();

    providers = [
      {
        provide: StorageService,
        useValue: storageSerivceMock,
      },
      {
        provide: Router,
        useValue: routerMock,
      },
    ];
  });

  it('should return true if token exits', () => {
    const spy = jest.fn();
    storageSerivceMock.get$.mockReturnValueOnce(of(true));

    const guard$ = runFnInContext(providers, () => authGuard({}, []));
    (<Observable<boolean | UrlTree>>guard$).pipe(take(1)).subscribe(spy);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should return trigger "parseUrl" with "/login" if token not exists', () => {
    const spy = jest.fn();
    storageSerivceMock.get$.mockReturnValueOnce(of(false));

    const guard$ = runFnInContext(providers, () => authGuard({}, []));
    (<Observable<boolean | UrlTree>>guard$).pipe(take(1)).subscribe(spy);

    expect(routerMock.parseUrl).toHaveBeenCalledWith('/login');
  });
});
