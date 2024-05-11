import { signal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { AppConstants } from '@constants/app.constants';
import { UsersApiService } from '@features/users/services/users-api.service';
import { GenericApiResponse } from '@models/api.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ToastService } from '@services/toast/toast.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import ResetPasswordPage from './reset-password.page';

describe(ResetPasswordPage.name, () => {
  let component: ResetPasswordPage;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let toastServiceMock: MockProxy<ToastService>;
  let translateServiceMock: MockProxy<TranslateService>;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;

  beforeEach(() => {
    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.verifyPasswordReset$.mockReturnValue(of({} as GenericApiResponse));

    toastServiceMock = mock<ToastService>();
    toastServiceMock.openWithListener$.mockReturnValue(of({} as any));

    translateServiceMock = mock<TranslateService>();
    translateServiceMock.get.mockReturnValue(of('message'));

    formBuilderMock = mock<NonNullableFormBuilder>();
    formBuilderMock.group.mockReturnValue(
      new FormGroup({
        password: new FormControl('', { nonNullable: true }),
        confirmPassword: new FormControl('', { nonNullable: true }),
      }) as FormGroup,
    );

    component = classWithProviders({
      token: ResetPasswordPage,
      providers: [
        {
          provide: NonNullableFormBuilder,
          useValue: formBuilderMock,
        },
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

    component.code = signal('code') as any;
  });

  describe('getPasswordError', () => {
    it('should return "validation.passwords_pattern" error if incorrect password entered', () => {
      const result = component.getPasswordError({ pattern: true });

      expect(result).toBe('validation.passwords_pattern');
    });

    it('should return "validation.required" error if password control has no value', () => {
      const result = component.getPasswordError({ required: true });

      expect(result).toBe('validation.required');
    });
  });

  describe('getConfirmPasswordError', () => {
    it('should return "validation.passwords_not_match" error if password does not match', () => {
      const result = component.getConfirmPasswordError({ notMatchedPassword: true });

      expect(result).toBe('validation.passwords_not_match');
    });
  });

  describe('submitForgotPassword', () => {
    describe('not valid form', () => {
      it('should not trigger "verifyPasswordReset$" api method, if form is not valid', () => {
        component.resetPasswordForm.setErrors({ required: true });

        component.submitResetPassword();

        expect(usersApiServiceMock.verifyPasswordReset$).not.toHaveBeenCalled();
      });
    });

    describe('valid form', () => {
      beforeEach(() => {
        component.resetPasswordForm.setValue({
          password: '1234abcD@@',
          confirmPassword: '1234abcD@@',
        });
      });

      it('should trigger "verifyPasswordReset$" api method, if form is valid', () => {
        component.submitResetPassword();

        expect(usersApiServiceMock.verifyPasswordReset$).toHaveBeenCalledWith({
          code: 'code',
          new_password: '1234abcD@@',
        });
      });

      it('should trigger translate toast message in case of success request', () => {
        component.submitResetPassword();

        expect(translateServiceMock.get).toHaveBeenCalledWith('reset_password.toast');
      });

      it('should open toast in case of success request', () => {
        const expectedToastConfig = {
          message: 'message',
          duration: AppConstants.toastDuration,
          cssClass: 'app-toast',
          position: 'bottom',
          buttons: [{ icon: 'close-outline', role: 'cancel' }],
        };

        component.submitResetPassword();

        expect(toastServiceMock.openWithListener$).toHaveBeenCalledWith(expectedToastConfig);
      });
    });
  });
});
