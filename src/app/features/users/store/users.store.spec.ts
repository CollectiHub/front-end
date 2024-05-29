import { HttpErrorResponse } from '@angular/common/http';
import { Provider } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '@constants/app.constants';
import { AuthApiService } from '@features/auth/services/auth-api.service';
import { GenericApiResponse } from '@models/api.models';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import { UsersApiService } from '../services/users-api.service';
import { UserDataDto } from '../users.models';

import { UsersStore } from './users.store';

describe('UsersStore', () => {
  let store: any;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let routerMock: MockProxy<Router>;
  let authApiSerivceMock: MockProxy<AuthApiService>;
  let storageServiceMock: MockProxy<StorageService>;

  let providers: Provider[];

  const userDataResponseMock = {
    email: 'email@gg.gg',
  };

  beforeEach(() => {
    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.updateUserData$.mockReturnValue(of({} as GenericApiResponse));
    usersApiServiceMock.verifyEmail$.mockReturnValue(of({} as GenericApiResponse));
    usersApiServiceMock.getUserData$.mockReturnValue(of(userDataResponseMock as UserDataDto));

    authApiSerivceMock = mock<AuthApiService>();
    authApiSerivceMock.logout$.mockReturnValue(of({} as GenericApiResponse));

    storageServiceMock = mock<StorageService>();
    storageServiceMock.remove$.mockReturnValue(of(undefined));

    routerMock = mock<Router>();

    providers = [
      {
        provide: UsersApiService,
        useValue: usersApiServiceMock,
      },
      {
        provide: Router,
        useValue: routerMock,
      },
      {
        provide: AuthApiService,
        useValue: authApiSerivceMock,
      },
      {
        provide: StorageService,
        useValue: storageServiceMock,
      },
    ];

    store = runFnInContext(providers, () => new UsersStore());
  });

  describe('updateUserData', () => {
    it('should trigger "updateUserData$" method of users api service', () => {
      store.updateUserData({});

      expect(usersApiServiceMock.updateUserData$).toHaveBeenCalledWith({});
    });

    it('should update state with user data', () => {
      const newData = { email: 'newEmail', username: 'newUsername' };

      store.updateUserData(newData);

      expect(store.userData()).toEqual(expect.objectContaining(newData));
    });

    it('should navigate to profile page', () => {
      store.updateUserData({});

      expect(routerMock.navigate).toHaveBeenCalledWith(['/profile']);
    });

    it('should save error message to store in case of error', () => {
      usersApiServiceMock.updateUserData$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'error update user' } })),
      );

      store.updateUserData({});

      expect(store.error()).toBe('error update user');
    });
  });

  describe('updateVerified', () => {
    it('should trigger "verifyEmail$" method of users api service', () => {
      store.updateVerified('code');

      expect(usersApiServiceMock.verifyEmail$).toHaveBeenCalledWith('code');
    });

    it('should update "verified" property in store', () => {
      store.updateVerified('code');

      expect(store.userData().verified).toBe(true);
    });

    it('should save error message to store in case of error', () => {
      usersApiServiceMock.verifyEmail$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'error verify email' } })),
      );

      store.updateVerified('code');

      expect(store.error()).toBe('error verify email');
    });
  });

  describe('loadUserData', () => {
    it('should trigger "getUserData$" method of users api service', () => {
      store.loadUserData();

      expect(usersApiServiceMock.getUserData$).toHaveBeenCalledTimes(1);
    });

    it('should update store with received user data', () => {
      store.loadUserData();

      expect(store.userData()).toStrictEqual(userDataResponseMock);
    });

    it('should trigger "logout" method in case if user data receiving failed', () => {
      usersApiServiceMock.getUserData$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'error get user data' } })),
      );

      store.loadUserData();

      expect(authApiSerivceMock.logout$).toHaveBeenCalledTimes(1);
    });

    it('should trigger "remove$" method of storage to remove auth token from store', () => {
      usersApiServiceMock.getUserData$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'error get user data' } })),
      );

      store.loadUserData();

      expect(storageServiceMock.remove$).toHaveBeenCalledWith(AppConstants.tokenStorageKey);
    });

    it('should navigate to login', () => {
      usersApiServiceMock.getUserData$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'error get user data' } })),
      );

      store.loadUserData();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
