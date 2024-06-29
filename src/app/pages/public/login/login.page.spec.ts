import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '@features/auth/services/auth-api/auth-api.service';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { LoaderService } from '@services/loader/loader.service';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';

import LoginPage from './login.page';

describe('RegistrationComponent', () => {
  let component: LoginPage;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;
  let authApiServiceMock: MockProxy<AuthApiService>;
  let storageServiceMock: MockProxy<StorageService>;
  let routerMock: MockProxy<Router>;
  let loaderServiceMock: MockProxy<LoaderService>;
  let usersStoreMock: MockProxy<UsersStoreMock>;
  let usersApiServiceMock: MockProxy<UsersApiService>;

  const validFormValue = { email: 'test@g.g', password: '1234abcD@@' };

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

    loaderServiceMock = mock<LoaderService>();
    loaderServiceMock.showUntilCompleted$.mockImplementation(obs$ => obs$);

    usersStoreMock = mock<UsersStoreMock>();

    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.getUserData$.mockReturnValue(of({} as UserDataDto));

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
        {
          provide: LoaderService,
          useValue: loaderServiceMock,
        },
        {
          provide: UsersStore,
          useValue: usersStoreMock,
        },
        {
          provide: UsersApiService,
          useValue: usersApiServiceMock,
        },
      ],
    });
  });

  describe('onLoginFormSubmit', () => {
    it('should display loader during API calls', () => {
      component.onLoginFormSubmit();

      expect(loaderServiceMock.showUntilCompleted$).toHaveBeenCalledTimes(1);
    });

    it('should trigger "set" method of Storage service if user was logged it', () => {
      component.loginForm.setValue(validFormValue);

      component.onLoginFormSubmit();

      expect(storageServiceMock.set$).toHaveBeenCalledWith(AppConstants.tokenStorageKey, 'token');
    });

    describe('login$ api method', () => {
      it('should not trigger "login$" method if form is invalid', () => {
        component.loginForm.setErrors({ rquired: true });

        component.onLoginFormSubmit();

        expect(authApiServiceMock.login$).not.toHaveBeenCalled();
      });

      it('should trigger "login$" method if form is valid', () => {
        component.loginForm.setValue(validFormValue);

        component.onLoginFormSubmit();

        expect(authApiServiceMock.login$).toHaveBeenCalledWith(validFormValue);
      });

      it('should not navigate user to "user-data-fetch-failed" route when login failed', () => {
        authApiServiceMock.login$.mockReturnValue(
          throwError(
            () =>
              new HttpErrorResponse({
                error: { message: 'error' },
              }),
          ),
        );
        component.loginForm.setValue(validFormValue);

        component.onLoginFormSubmit();

        expect(routerMock.navigate).not.toHaveBeenCalledWith(['/user-data-fetch-failed']);
      });

      it('should not save error to user storage if login failed', () => {
        authApiServiceMock.login$.mockReturnValue(
          throwError(
            () =>
              new HttpErrorResponse({
                error: { message: 'error' },
              }),
          ),
        );
        component.loginForm.setValue(validFormValue);

        component.onLoginFormSubmit();

        expect(usersStoreMock.setError).not.toHaveBeenCalledWith('error');
      });
    });

    describe('user data fetch success', () => {
      it('should trigger "getUserData$" method after login', () => {
        component.loginForm.setValue(validFormValue);

        component.onLoginFormSubmit();

        expect(usersApiServiceMock.getUserData$).toHaveBeenCalledWith('token');
      });

      it('should navigate to "collection" page after login', () => {
        component.loginForm.setValue(validFormValue);

        component.onLoginFormSubmit();

        expect(usersStoreMock.setUserData).toHaveBeenCalledWith({});
      });
    });

    describe('user data fetch error', () => {
      beforeEach(() => {
        usersApiServiceMock.getUserData$.mockReturnValue(
          throwError(
            () =>
              new HttpErrorResponse({
                error: { message: 'error' },
              }),
          ),
        );
      });

      it('should save error to user storage', () => {
        component.loginForm.setValue(validFormValue);

        component.onLoginFormSubmit();

        expect(usersStoreMock.setError).toHaveBeenCalledWith('error');
      });

      it('should navigate to "user-data-fetch-failed" page if user data fetch failed', () => {
        component.loginForm.setValue(validFormValue);

        component.onLoginFormSubmit();

        expect(routerMock.navigate).toHaveBeenCalledWith(['/user-data-fetch-failed']);
      });
    });
  });
});
