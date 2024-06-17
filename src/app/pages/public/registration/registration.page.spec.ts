import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '@constants/app.constants';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { LoaderService } from '@services/loader/loader.service';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { AuthApiService } from 'src/app/features/auth/services/auth-api.service';

import RegistrationPageComponent from './registration.page';

describe('RegistrationComponent', () => {
  let component: RegistrationPageComponent;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;
  let authApiServiceMock: MockProxy<AuthApiService>;
  let translateServiceMock: MockProxy<TranslateService>;
  let loaderServiceMock: MockProxy<LoaderService>;
  let storageServiceMock: MockProxy<StorageService>;
  let routerMock: MockProxy<Router>;

  beforeEach(() => {
    formBuilderMock = mock<NonNullableFormBuilder>();
    formBuilderMock.group.mockReturnValue(
      new FormGroup({
        username: new FormControl('', { nonNullable: true }),
        email: new FormControl('', { nonNullable: true }),
        password: new FormControl('', { nonNullable: true }),
        confirmPassword: new FormControl('', { nonNullable: true }),
      }) as FormGroup,
    );

    authApiServiceMock = mock<AuthApiService>();
    authApiServiceMock.register$.mockReturnValue(of('token'));

    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockReturnValue('message');

    loaderServiceMock = mock<LoaderService>();
    loaderServiceMock.showUntilCompleted$.mockImplementation(obs$ => obs$);

    storageServiceMock = mock<StorageService>();
    storageServiceMock.set$.mockReturnValue(of(undefined));

    routerMock = mock<Router>();

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
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: LoaderService,
          useValue: loaderServiceMock,
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

  describe('onRegistrationFormSubmit', () => {
    describe('form not valid', () => {
      it('should not trigger "register$" method if form is invalid', () => {
        component.registrationForm.setErrors({ rquired: true });

        component.onRegistrationFormSubmit();

        expect(authApiServiceMock.register$).not.toHaveBeenCalled();
      });
    });

    describe('form valid', () => {
      beforeEach(() => {
        component.registrationForm.setValue({
          email: 'test@g.g',
          username: '123',
          confirmPassword: '1234abcD@@',
          password: '1234abcD@@',
        });
      });

      it('should trigger "register$" method if form is valid', () => {
        component.onRegistrationFormSubmit();

        expect(authApiServiceMock.register$).toHaveBeenCalledWith({
          email: 'test@g.g',
          username: '123',
          password: '1234abcD@@',
        });
      });

      it('sould trigger "showUntilCompleted$" to display loader for api request with message', () => {
        component.onRegistrationFormSubmit();

        expect(loaderServiceMock.showUntilCompleted$).toHaveBeenCalledWith(
          authApiServiceMock.register$({} as any),
          'message',
        );
      });

      it('sould trigger "instant" method of translate service, to get loading message', () => {
        component.onRegistrationFormSubmit();

        expect(translateServiceMock.instant).toHaveBeenCalledWith('register.loading');
      });

      it('sould trigger "set$" method of storage service, to save token from response', () => {
        component.onRegistrationFormSubmit();

        expect(storageServiceMock.set$).toHaveBeenCalledWith(AppConstants.tokenStorageKey, 'token');
      });

      it('sould navigate to "collection" page after successful API request', () => {
        component.onRegistrationFormSubmit();

        expect(routerMock.navigate).toHaveBeenCalledWith(['/collection']);
      });
    });
  });
});
