import { NonNullableFormBuilder } from '@angular/forms';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import RegistrationPageComponent from './registration.page';

describe('RegistrationComponent', () => {
  let component: RegistrationPageComponent;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;

  beforeEach(() => {
    formBuilderMock = mock<NonNullableFormBuilder>();

    component = classWithProviders({
      token: RegistrationPageComponent,
      providers: [
        {
          provide: NonNullableFormBuilder,
          useValue: formBuilderMock,
        },
      ],
    });
  });

  describe('togglePasswordReveal', () => {
    it('should trigger "set" method of signal with oposite value', () => {
      const spy = jest.spyOn(component.isPasswordRevealed, 'set');

      component.togglePasswordReveal();

      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('toggleConfirmPasswordReveal', () => {
    it('should trigger "set" method of signal with oposite value', () => {
      const spy = jest.spyOn(component.isConfirmPasswordRevealed, 'set');

      component.toggleConfirmPasswordReveal();

      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('getEmailError', () => {
    it('should return "validation.required" text if such error in form control', () => {
      const result = component.getEmailError({ required: true });

      expect(result).toBe('validation.required');
    });

    it('should return "validation.invalid_email" text if control error is not required', () => {
      const result = component.getEmailError({ noRequired: true });

      expect(result).toBe('validation.invalid_email');
    });
  });

  describe('getConfirmPasswordError', () => {
    it('should return "validation.passwords_not_match" error if password does not match', () => {
      const result = component.getConfirmPasswordError({ notMatchedPassword: true }, {});

      expect(result).toBe('validation.passwords_not_match');
    });
  });
});
