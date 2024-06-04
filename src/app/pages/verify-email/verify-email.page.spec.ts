import { signal } from '@angular/core';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { GenericApiResponse } from '@models/api.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import VerifyEmailPage from './verify-email.page';

describe(VerifyEmailPage.name, () => {
  let component: VerifyEmailPage;
  let usersApiService: MockProxy<UsersApiService>;
  let usersStoreMock: MockProxy<UsersStoreMock>;

  beforeEach(() => {
    usersApiService = mock<UsersApiService>();
    usersApiService.verifyEmail$.mockReturnValue(of({} as GenericApiResponse));

    usersStoreMock = mock<UsersStoreMock>();

    component = classWithProviders({
      token: VerifyEmailPage,
      providers: [
        {
          provide: UsersApiService,
          useValue: usersApiService,
        },
        {
          provide: UsersStore,
          useValue: usersStoreMock,
        },
      ],
    });

    component.code = signal('code') as any;
  });

  describe('ngOnInit', () => {
    describe('api call', () => {
      it('should trigger "verifyEmail$" method of users api service', () => {
        component.ngOnInit();

        expect(usersApiService.verifyEmail$).toHaveBeenCalledWith('code');
      });
    });

    describe('success', () => {
      it('should set "isVerified" to true, if API request was executed without error', () => {
        component.ngOnInit();

        expect(component.isVerified()).toBe(true);
      });

      it('should trigger "setEmailVerified" store method if user data defined', () => {
        usersStoreMock.userData.mockReturnValue({});

        component.ngOnInit();

        expect(usersStoreMock.setEmailVerified).toHaveBeenCalledTimes(1);
      });

      it('should not trigger "setEmailVerified" store method if user data is not defined', () => {
        usersStoreMock.userData.mockReturnValue(undefined);

        component.ngOnInit();

        expect(usersStoreMock.setEmailVerified).not.toHaveBeenCalled();
      });
    });

    describe('error', () => {
      it('should set "isVerified" to false, if API request was executed with error', () => {
        usersApiService.verifyEmail$.mockReturnValue(throwError(() => new Error('error')));

        component.ngOnInit();

        expect(component.isVerified()).toBe(false);
      });
    });
  });
});
