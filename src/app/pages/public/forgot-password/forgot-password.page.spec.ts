import { AppConstants } from '@constants/app.constants';
import { UsersApiService } from '@features/users/services/users-api.service';
import { GenericApiResponse } from '@models/api.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
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
    toastServiceMock.openWithListener$.mockReturnValue(of({} as any));

    translateServiceMock = mock<TranslateService>();
    translateServiceMock.get.mockReturnValue(of('message'));

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

  describe('getControlError', () => {
    it('should return "validation.required" text if such error in form control', () => {
      const result = component.getControlError({ required: true });

      expect(result).toBe('validation.required');
    });

    it('should return "validation.invalid_email" text if control error is not required', () => {
      const result = component.getControlError({ noRequired: true });

      expect(result).toBe('validation.invalid_email');
    });
  });

  describe('submitResetPassword', () => {
    it('should trigger "requestPasswordReset$" api method, if field is valid', () => {
      component.forgotPasswordControl.setValue('email@gg.gg');
      component.submitResetPassword();

      expect(usersApiServiceMock.requestPasswordReset$).toHaveBeenCalledWith('email@gg.gg');
    });

    it('should not trigger "requestPasswordReset$" api method, if field is not valid', () => {
      component.forgotPasswordControl.setValue('123');
      component.submitResetPassword();

      expect(usersApiServiceMock.requestPasswordReset$).not.toHaveBeenCalled();
    });

    it('should trigger translate toast message in case of success request', () => {
      component.forgotPasswordControl.setValue('email@gg.gg');
      component.submitResetPassword();

      expect(translateServiceMock.get).toHaveBeenCalledWith('reset_password.toast', { email: 'email@gg.gg' });
    });

    it('should open toast in case of success request', () => {
      const expectedToastConfig = {
        message: 'message',
        duration: AppConstants.toastDuration,
        cssClass: 'app-toast',
        position: 'bottom',
      };

      component.forgotPasswordControl.setValue('email@gg.gg');
      component.submitResetPassword();

      expect(toastServiceMock.openWithListener$).toHaveBeenCalledWith(expectedToastConfig);
    });
  });
});
