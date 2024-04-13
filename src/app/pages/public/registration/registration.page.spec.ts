import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { RegisterResponseDto } from 'src/app/features/auth/auth.models';
import { AuthApiService } from 'src/app/features/auth/services/auth-api.service';

import RegistrationPageComponent from './registration.page';

describe('RegistrationComponent', () => {
  let component: RegistrationPageComponent;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;
  let authApiServiceMock: MockProxy<AuthApiService>;

  beforeEach(() => {
    authApiServiceMock = mock<AuthApiService>();
    authApiServiceMock.register$.mockReturnValue(of({} as RegisterResponseDto));

    formBuilderMock = mock<NonNullableFormBuilder>();
    formBuilderMock.group.mockReturnValue(
      new FormGroup({
        username: new FormControl('', { nonNullable: true }),
        email: new FormControl('', { nonNullable: true }),
        password: new FormControl('', { nonNullable: true }),
        confirmPassword: new FormControl('', { nonNullable: true }),
      }) as FormGroup,
    );

    component = classWithProviders({
      token: RegistrationPageComponent,
      providers: [
        {
          provide: NonNullableFormBuilder,
          useValue: formBuilderMock,
        },
        {
          provide: AuthApiService,
          useValue: authApiServiceMock,
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

  describe('onRegistrationFormSubmit', () => {
    it('should not trigger "register$" method if form is invalid', () => {
      component.registrationForm.setErrors({ rquired: true });

      component.onRegistrationFormSubmit();

      expect(authApiServiceMock.register$).not.toHaveBeenCalled();
    });

    it('should trigger "register$" method if form is valid', () => {
      const formValue = { email: 'test@g.g', username: '123', confirmPassword: '1234abcD@@', password: '1234abcD@@' };
      component.registrationForm.setValue(formValue);

      component.onRegistrationFormSubmit();

      expect(authApiServiceMock.register$).toHaveBeenCalledWith(formValue);
    });
  });
});
