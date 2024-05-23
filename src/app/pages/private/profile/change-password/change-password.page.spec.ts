import { NonNullableFormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import ChangePasswordPage from './change-password.page';

describe(ChangePasswordPage.name, () => {
  let component: ChangePasswordPage;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;
  let navControllerMock: MockProxy<NavController>;

  beforeEach(() => {
    formBuilderMock = mock<NonNullableFormBuilder>();
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
      ],
    });
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

    it('should return "required" error is not "passwordNotMatch', () => {
      const result = component.getConfirmPasswordError({ required: true });

      expect(result).toBe('validation.required');
    });
  });

  describe('goToProfile', () => {
    it('should trigger "navigateBack" when called', () => {
      component.goToProfile();

      expect(navControllerMock.navigateBack).toHaveBeenCalledWith('/profile');
    });
  });
});
