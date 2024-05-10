import { signal } from '@angular/core';
import { UsersApiService } from '@features/users/services/users-api.service';
import { GenericApiResponse } from '@models/api.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import VerifyEmailPage from './verify-email.page';

describe(VerifyEmailPage.name, () => {
  let component: VerifyEmailPage;
  let usersApiService: MockProxy<UsersApiService>;

  beforeEach(() => {
    usersApiService = mock<UsersApiService>();
    usersApiService.verifyEmail$.mockReturnValue(of({} as GenericApiResponse));

    component = classWithProviders({
      token: VerifyEmailPage,
      providers: [
        {
          provide: UsersApiService,
          useValue: usersApiService,
        },
      ],
    });

    component.code = signal('code') as any;
  });

  describe('ngOnInit', () => {
    it('should trigger "verifyEmail$" method of users api service', () => {
      component.ngOnInit();

      expect(usersApiService.verifyEmail$).toHaveBeenCalledWith('code');
    });

    it('should set "isVerified" to true, if API request was executed without error', () => {
      component.ngOnInit();

      expect(component.isVerified()).toBe(true);
    });

    it('should set "isVerified" to false, if API request was executed with error', () => {
      usersApiService.verifyEmail$.mockReturnValue(throwError(() => new Error('error')));

      component.ngOnInit();

      expect(component.isVerified()).toBe(false);
    });
  });
});
