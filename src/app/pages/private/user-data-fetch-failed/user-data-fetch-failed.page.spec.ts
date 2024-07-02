import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@features/auth/services/auth-facade/auth-facade.service';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import UserDataFetchFailedPage from './user-data-fetch-failed.page';

describe(UserDataFetchFailedPage.name, () => {
  let component: UserDataFetchFailedPage;
  let usersStoreMock: MockProxy<UsersStoreMock>;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let authFacadeServiceMock: MockProxy<AuthFacadeService>;
  let routerMock: MockProxy<Router>;

  beforeEach(() => {
    usersStoreMock = mock<UsersStoreMock>();

    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.getUserData$.mockReturnValue(of({} as UserDataDto));

    authFacadeServiceMock = mock<AuthFacadeService>();
    authFacadeServiceMock.logout$.mockReturnValue(of([] as any));

    routerMock = mock<Router>();

    component = classWithProviders({
      token: UserDataFetchFailedPage,
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
          provide: AuthFacadeService,
          useValue: authFacadeServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
  });

  describe('fetchUserData', () => {
    it('should trigger "getUserData$" method of users API service with token received from storage', () => {
      component.fetchUserData();

      expect(usersApiServiceMock.getUserData$).toHaveBeenCalledTimes(1);
    });

    it('should trigger "setUserData" action of users store in case of success request', () => {
      component.fetchUserData();

      expect(usersStoreMock.setUserData).toHaveBeenCalledWith({});
    });

    it('should save error to store in case of failed request', () => {
      usersApiServiceMock.getUserData$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'error' } })),
      );
      component.fetchUserData();

      expect(usersStoreMock.setError).toHaveBeenCalledWith('error');
    });
  });

  describe('logout', () => {
    it('should trigger "logout$" method of authFacadeService', () => {
      component.logout();

      expect(authFacadeServiceMock.logout$).toHaveBeenCalledTimes(1);
    });

    it('should trigger "clear" action of usersStore if logout was successful', () => {
      component.logout();

      expect(usersStoreMock.clear).toHaveBeenCalledTimes(1);
    });

    it('should navigate to login, if logout was successful', () => {
      component.logout();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should save error to store if error received during logout api call', () => {
      authFacadeServiceMock.logout$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'error' } })),
      );
      component.logout();

      expect(usersStoreMock.setError).toHaveBeenCalledWith('error');
    });
  });
});
