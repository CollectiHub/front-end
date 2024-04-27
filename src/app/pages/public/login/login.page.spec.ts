import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { AuthApiService } from 'src/app/features/auth/services/auth-api.service';

import LoginPage from './login.page';

describe('RegistrationComponent', () => {
  let component: LoginPage;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;
  let authApiServiceMock: MockProxy<AuthApiService>;
  let storageServiceMock: MockProxy<StorageService>;

  beforeEach(() => {
    storageServiceMock = mock<StorageService>();

    authApiServiceMock = mock<AuthApiService>();
    authApiServiceMock.login$.mockReturnValue(of('token'));

    formBuilderMock = mock<NonNullableFormBuilder>();
    formBuilderMock.group.mockReturnValue(
      new FormGroup({
        email: new FormControl('', { nonNullable: true }),
        password: new FormControl('', { nonNullable: true }),
      }) as FormGroup,
    );

    component = classWithProviders({
      token: LoginPage,
      providers: [
        {
          provide: NonNullableFormBuilder,
          useValue: formBuilderMock,
        },
        {
          provide: AuthApiService,
          useValue: authApiServiceMock,
        },
        {
          provide: StorageService,
          useValue: storageServiceMock,
        },
      ],
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

  describe('onLoginFormSubmit', () => {
    it('should not trigger "login$" method if form is invalid', () => {
      component.loginForm.setErrors({ rquired: true });

      component.onLoginFormSubmit();

      expect(authApiServiceMock.login$).not.toHaveBeenCalled();
    });

    it('should trigger "login$" method if form is valid', () => {
      const formValue = { email: 'test@g.g', password: '1234abcD@@' };
      component.loginForm.setValue(formValue);

      component.onLoginFormSubmit();

      expect(authApiServiceMock.login$).toHaveBeenCalledWith(formValue);
    });

    it('should trigger "set" method of Storage service if user was logged it', () => {
      const formValue = { email: 'test@g.g', password: '1234abcD@@' };
      component.loginForm.setValue(formValue);

      component.onLoginFormSubmit();

      expect(storageServiceMock.set).toHaveBeenCalledWith(AppConstants.tokenStorageKey, 'token');
    });
  });
});
