import { UsersApiService } from '@features/users/services/users-api.service';
import { GenericApiResponse } from '@models/api.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import ForgotPasswordComponent from './forgot-password.page';

describe('ResetPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let toastServiceMock: MockProxy<ToastService>;
  let translateServiceMock: MockProxy<TranslateService>;

  beforeEach(() => {
    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.requestPasswordReset$.mockReturnValue(of({} as GenericApiResponse));

    toastServiceMock = mock<ToastService>();
    toastServiceMock.open$.mockReturnValue(of({} as any));

    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockImplementation(key => key);

    component = classWithProviders({
      token: ForgotPasswordComponent,
      providers: [
        {
          provide: UsersApiService,
          useValue: usersApiServiceMock,
        },
        {
          provide: ToastService,
          useValue: toastServiceMock,
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    });
  });

  describe('submitForgotPassword', () => {
    it('should trigger "requestPasswordReset$" api method, if field is valid', () => {
      component.forgotPasswordControl.setValue('email@gg.gg');
      component.submitForgotPassword();

      expect(usersApiServiceMock.requestPasswordReset$).toHaveBeenCalledWith('email@gg.gg');
    });

    it('should not trigger "requestPasswordReset$" api method, if field is not valid', () => {
      component.forgotPasswordControl.setValue('123');
      component.submitForgotPassword();

      expect(usersApiServiceMock.requestPasswordReset$).not.toHaveBeenCalled();
    });

    it('should trigger translate toast message in case of success request', () => {
      component.forgotPasswordControl.setValue('email@gg.gg');
      component.submitForgotPassword();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('forgot_password.toast', { email: 'email@gg.gg' });
    });

    it('shouldopen toast in case of success', () => {
      component.forgotPasswordControl.setValue('email@gg.gg');
      component.submitForgotPassword();

      expect(toastServiceMock.open$).toHaveBeenCalledWith('forgot_password.toast', ToastColor.Success);
    });
  });
});
