import { HttpErrorResponse } from '@angular/common/http';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import { ModalController } from '@ionic/angular/standalone';
import { ModalEventRole } from '@models/app.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import UserDataFetchFailedComponent from './user-data-fetch-failed.component';

describe(UserDataFetchFailedComponent.name, () => {
  let component: UserDataFetchFailedComponent;
  let usersStoreMock: MockProxy<UsersStoreMock>;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let modalControllerMock: MockProxy<ModalController>;

  beforeEach(() => {
    usersStoreMock = mock<UsersStoreMock>();

    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.getUserData$.mockReturnValue(of({} as UserDataDto));

    modalControllerMock = mock<ModalController>();

    component = classWithProviders({
      token: UserDataFetchFailedComponent,
      providers: [
        {
          provide: UsersStore,
          useValue: usersStoreMock,
        },
        {
          provide: UsersApiService,
          useValue: usersApiServiceMock,
        },
        {
          provide: ModalController,
          useValue: modalControllerMock,
        },
      ],
    });
  });

  describe('fetchUserData', () => {
    it('should trigger "getUserData$" method of users API service', () => {
      component.fetchUserData();

      expect(usersApiServiceMock.getUserData$).toHaveBeenCalledTimes(1);
    });

    it('should trigger "setUserData" action of users store in case of success request', () => {
      component.fetchUserData();

      expect(usersStoreMock.setUserData).toHaveBeenCalledWith({});
    });

    it('should dismiss modal in case of success request', () => {
      component.fetchUserData();

      expect(modalControllerMock.dismiss).toHaveBeenCalledWith(undefined, ModalEventRole.ProgramaticDismiss);
    });

    it('should save error to store in case of failed request', () => {
      usersApiServiceMock.getUserData$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'error' } })),
      );
      component.fetchUserData();

      expect(usersStoreMock.setError).toHaveBeenCalledWith('error');
    });
  });

  describe('logout', () => {
    it('should trigger "logout" method of users store', () => {
      component.logout();

      expect(usersStoreMock.logout).toHaveBeenCalledTimes(1);
    });

    it('should dimiss modal', () => {
      component.logout();

      expect(modalControllerMock.dismiss).toHaveBeenCalledWith(undefined, ModalEventRole.ProgramaticDismiss);
    });
  });
});
