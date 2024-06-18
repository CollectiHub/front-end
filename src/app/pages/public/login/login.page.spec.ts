import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '@features/auth/services/auth-api/auth-api.service';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';

import LoginPage from './login.page';

describe('RegistrationComponent', () => {
  let component: LoginPage;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;
  let authApiServiceMock: MockProxy<AuthApiService>;
  let storageServiceMock: MockProxy<StorageService>;
  let routerMock: MockProxy<Router>;

  beforeEach(() => {
    storageServiceMock = mock<StorageService>();
    storageServiceMock.set$.mockReturnValue(of(undefined));

    authApiServiceMock = mock<AuthApiService>();
    authApiServiceMock.login$.mockReturnValue(of('token'));

    formBuilderMock = mock<NonNullableFormBuilder>();
    formBuilderMock.group.mockReturnValue(
      new FormGroup({
        email: new FormControl('', { nonNullable: true }),
        password: new FormControl('', { nonNullable: true }),
      }) as FormGroup,
    );

    routerMock = mock<Router>();

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
        {
          provide: Router,
          useValue: routerMock,
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

      expect(storageServiceMock.set$).toHaveBeenCalledWith(AppConstants.tokenStorageKey, 'token');
    });

    it('should navigate to "collection" page after login', () => {
      const formValue = { email: 'test@g.g', password: '1234abcD@@' };
      component.loginForm.setValue(formValue);

      component.onLoginFormSubmit();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/collection']);
    });
  });
});
