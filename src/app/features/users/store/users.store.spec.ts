import { HttpErrorResponse } from '@angular/common/http';
import { Provider } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import * as PreferencesPackage from '@capacitor/preferences';
import { AuthApiService } from '@features/auth/services/auth-api/auth-api.service';
import { GenericApiResponse } from '@models/api.models';
import { getState } from '@ngrx/signals';
import { TranslateService } from '@ngx-translate/core';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { LoaderService } from '@services/loader/loader.service';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import { UsersApiService } from '../services/users-api.service';
import { UserDataDto } from '../users.models';

import { UsersStore } from './users.store';

jest.mock('@capacitor/preferences', () => {
  return {
    Preferences: { clear: () => Promise.resolve(undefined) },
  };
});

describe('UsersStore', () => {
  let store: any;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let routerMock: MockProxy<Router>;
  let authApiSerivceMock: MockProxy<AuthApiService>;
  let storageServiceMock: MockProxy<StorageService>;
  let loaderServiceMock: MockProxy<LoaderService>;
  let translateServiceMock: MockProxy<TranslateService>;

  let providers: Provider[];

  const userDataResponseMock = {
    email: 'email@gg.gg',
  };

  beforeEach(() => {
    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.updateUserData$.mockReturnValue(of({} as GenericApiResponse));
    usersApiServiceMock.verifyEmail$.mockReturnValue(of({} as GenericApiResponse));
    usersApiServiceMock.getUserData$.mockReturnValue(of(userDataResponseMock as UserDataDto));
    usersApiServiceMock.deleteUser$.mockReturnValue(of({} as GenericApiResponse));

    authApiSerivceMock = mock<AuthApiService>();
    authApiSerivceMock.logout$.mockReturnValue(of({} as GenericApiResponse));

    routerMock = mock<Router>();

    storageServiceMock = mock<StorageService>();
    storageServiceMock.remove$.mockReturnValue(of(undefined));
    storageServiceMock.clear$.mockReturnValue(of(undefined));

    loaderServiceMock = mock<LoaderService>();
    loaderServiceMock.showUntilCompleted$.mockImplementation(obs$ => obs$);

    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockImplementation(k => k);

    providers = [
      {
        provide: UsersApiService,
        useValue: usersApiServiceMock,
      },
      {
        provide: AuthApiService,
        useValue: authApiSerivceMock,
      },
      {
        provide: Router,
        useValue: routerMock,
      },
      {
        provide: StorageService,
        useValue: storageServiceMock,
      },
      {
        provide: LoaderService,
        useValue: loaderServiceMock,
      },
      {
        provide: TranslateService,
        useValue: translateServiceMock,
      },
    ];

    store = runFnInContext(providers, () => new UsersStore());
  });

  describe('clear', () => {
    it('should clear storage data', () => {
      store.setUserData({});
      store.setError('error');

      store.clear();

      expect(getState(store)).toStrictEqual({ userData: undefined, error: undefined });
    });
  });

  describe('setUserData', () => {
    it('should save user data to store', () => {
      store.setUserData({});

      expect(store.userData()).toStrictEqual({});
    });
  });

  describe('setEmailVerified', () => {
    it('should update verified property of user data to true', () => {
      store.setEmailVerified();

      expect(store.userData().verified).toBe(true);
    });
  });

  describe('setError', () => {
    it('should save error to store', () => {
      store.setError('error');

      expect(store.error()).toBe('error');
    });
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

  describe('deleteUser', () => {
    it('should trigger "deleteUser$" method of usersApiService', () => {
      store.deleteUser();

      expect(usersApiServiceMock.deleteUser$).toHaveBeenCalledTimes(1);
    });

    it('should trigger "logout$" method of authApiService', () => {
      store.deleteUser();

      expect(authApiSerivceMock.logout$).toHaveBeenCalledTimes(1);
    });

    it('should trigger "clear$" method of storageService', () => {
      store.deleteUser();

      expect(storageServiceMock.clear$).toHaveBeenCalledTimes(1);
    });

    it('should trigger "clear" method of Preferences', () => {
      const spy = jest.spyOn(PreferencesPackage.Preferences, 'clear');

      store.deleteUser();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should display loader with message', () => {
      store.deleteUser();

      expect(loaderServiceMock.showUntilCompleted$).toHaveBeenCalledTimes(1);
    });

    it('should translate text for loader', () => {
      store.deleteUser();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('profile.delete_account_loader');
    });

    it('should navigate to "registration" page in case of successful operation', fakeAsync(() => {
      store.deleteUser();
      tick();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/registration']);
    }));

    it('should erase user data in case of successful operation', fakeAsync(() => {
      store.deleteUser();

      expect(store.userData()).toBe(undefined);
    }));

    it('should erase error data in case of successful operation', fakeAsync(() => {
      store.deleteUser();
      tick();

      expect(store.error()).toBe(undefined);
    }));

    it('should save error to store in case of failed operation', () => {
      usersApiServiceMock.deleteUser$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'error' } })),
      );

      store.deleteUser();

      expect(store.error()).toBe('error');
    });
  });
});
