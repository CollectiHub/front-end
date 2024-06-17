import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { AppConstants } from '@constants/app.constants';
import { UsersApiService } from '@features/users/services/users-api.service';
import { NavController } from '@ionic/angular/standalone';
import { GenericApiResponse } from '@models/api.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { LoaderService } from '@services/loader/loader.service';
import { ToastService } from '@services/toast/toast.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import ChangePasswordPage from './change-password.page';

describe(ChangePasswordPage.name, () => {
  let component: ChangePasswordPage;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;
  let navControllerMock: MockProxy<NavController>;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let loaderServiceMock: MockProxy<LoaderService>;
  let toastServiceMock: MockProxy<ToastService>;
  let translateServiceMock: MockProxy<TranslateService>;
  let cdrMock: MockProxy<ChangeDetectorRef>;

  beforeEach(() => {
    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.changePassword$.mockReturnValue(of({} as GenericApiResponse));

    loaderServiceMock = mock<LoaderService>();
    loaderServiceMock.showUntilCompleted$.mockImplementation(obs$ => obs$);

    toastServiceMock = mock<ToastService>();
    toastServiceMock.open$.mockReturnValue(of({} as any));

    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockImplementation(key => key);

    cdrMock = mock<ChangeDetectorRef>();

    formBuilderMock = mock<NonNullableFormBuilder>();
    formBuilderMock.group.mockReturnValue(
      new FormGroup({
        oldPassword: new FormControl('oldPassword', { nonNullable: true }),
        password: new FormControl('1234abcD@@', { nonNullable: true }),
        confirmPassword: new FormControl('1234abcD@@', { nonNullable: true }),
      }) as FormGroup,
    );

    navControllerMock = mock<NavController>();

    component = classWithProviders({
      token: ChangePasswordPage,
      providers: [
        {
          provide: NonNullableFormBuilder,
          useValue: formBuilderMock,
        },
        {
          provide: NavController,
          useValue: navControllerMock,
        },
        {
          provide: UsersApiService,
          useValue: usersApiServiceMock,
        },
        {
          provide: LoaderService,
          useValue: loaderServiceMock,
        },
        {
          provide: ToastService,
          useValue: toastServiceMock,
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: ChangeDetectorRef,
          useValue: cdrMock,
        },
      ],
    });
  });

  describe('getPasswordError', () => {
    it('should return "validation.password_pattern" error if incorrect password entered', () => {
      const result = component.getPasswordError({ pattern: true });

      expect(result).toBe('validation.password_pattern');
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

    it('should return "required" error is not "passwordNotMatch', () => {
      const result = component.getConfirmPasswordError({ required: true });

      expect(result).toBe('validation.required');
    });
  });

  describe('changePassword', () => {
    describe('form is not valid', () => {
      it('should  not trigger "changePassword$" method of usersApiService', () => {
        component.changePasswordForm.setErrors({ required: true });

        component.changePassword();

        expect(usersApiServiceMock.changePassword$).not.toHaveBeenCalled();
      });
    });

    describe('form is valid', () => {
      it('should trigger "changePassword$" method of usersApiService', () => {
        const expectedBody = {
          old_password: 'oldPassword',
          new_password: '1234abcD@@',
        };

        component.changePassword();

        expect(usersApiServiceMock.changePassword$).toHaveBeenCalledWith(expectedBody);
      });

      it('should trigger "showUntilCompleted$" method to display loader', () => {
        component.changePassword();

        expect(loaderServiceMock.showUntilCompleted$).toHaveBeenCalledTimes(1);
      });

      it('should translate toast message', () => {
        component.changePassword();

        expect(translateServiceMock.instant).toHaveBeenCalledWith('change_password.toast');
      });

      it('should open toast in case of success with correct config', () => {
        const expectedToastConfig = {
          message: 'change_password.toast',
          duration: AppConstants.toastDuration,
          cssClass: 'app-toast',
          position: 'bottom',
          color: 'success',
          buttons: [{ icon: 'close-outline', role: 'cancel' }],
        };

        component.changePassword();

        expect(toastServiceMock.open$).toHaveBeenCalledWith(expectedToastConfig);
      });

      it('should form after success request', () => {
        const spy = jest.spyOn(component.changePasswordForm, 'reset');

        component.changePassword();

        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should trigger "markForCheck" method of form in case of success', () => {
        component.changePassword();

        expect(cdrMock.markForCheck).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('goToProfile', () => {
    it('should trigger "navigateBack" when called', () => {
      component.goToProfile();

      expect(navControllerMock.navigateBack).toHaveBeenCalledWith('/profile');
    });
  });
});
