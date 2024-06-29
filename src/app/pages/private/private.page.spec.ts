import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import PrivatePage from './private.page';

describe(PrivatePage.name, () => {
  let component: PrivatePage;
  let usersStoreMock: MockProxy<UsersStoreMock>;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let routerMock: MockProxy<Router>;

  beforeEach(() => {
    usersStoreMock = mock<UsersStoreMock>();

    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.getUserData$.mockReturnValue(of({} as UserDataDto));

    routerMock = mock<Router>();

    component = classWithProviders({
      token: PrivatePage,
      providers: [
        {
          provide: UsersStore,
          useValue: usersStoreMock,
        },
        {
          provide: UsersApiService,
          useValue: usersApiServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
  });

  describe('ngOnInit', () => {
    describe('user data was fetched', () => {
      describe('successful user data request', () => {
        it('should trigger "getUserData$" method of api service', () => {
          component.ngOnInit();

          expect(usersApiServiceMock.getUserData$).toHaveBeenCalledTimes(1);
        });

        it('should emit "setUserData" action of user storage', () => {
          component.ngOnInit();

          expect(usersStoreMock.setUserData).toHaveBeenCalledWith({});
        });
      });

      describe('failded user data request', () => {
        beforeEach(() => {
          usersApiServiceMock.getUserData$.mockReturnValue(
            throwError(() => new HttpErrorResponse({ error: { message: 'error' } })),
          );
        });

        it('should save error to users store', () => {
          component.ngOnInit();

          expect(usersStoreMock.setError).toHaveBeenCalledWith('error');
        });

        it('should navigate to "user-data-fetch-failed" route', () => {
          component.ngOnInit();

          expect(routerMock.navigate).toHaveBeenCalledWith(['/user-data-fetch-failed']);
        });
      });
    });

    describe('not user data in store', () => {
      it('should not trigger "getUserData$" method of api service', () => {
        component.ngOnInit();

        expect(usersApiServiceMock.getUserData$).toHaveBeenCalledTimes(1);
      });

      it('should not emit "setUserData" action of user storage', () => {
        component.ngOnInit();

        expect(usersStoreMock.setUserData).toHaveBeenCalledWith({});
      });
    });
  });
});
