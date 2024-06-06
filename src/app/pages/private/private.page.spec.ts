import { HttpErrorResponse } from '@angular/common/http';
import UserDataFetchFailedComponent from '@features/users/components/user-data-fetch-failed/user-data-fetch-failed.component';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ModalService } from '@services/modal/modal.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import PrivatePage from './private.page';

describe(PrivatePage.name, () => {
  let component: PrivatePage;
  let usersStoreMock: MockProxy<UsersStoreMock>;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let modalServiceMock: MockProxy<ModalService>;

  beforeEach(() => {
    usersStoreMock = mock<UsersStoreMock>();

    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.getUserData$.mockReturnValue(of({} as UserDataDto));

    modalServiceMock = mock<ModalService>();
    modalServiceMock.open$.mockReturnValue(of({} as HTMLIonModalElement));

    component = classWithProviders({
      token: PrivatePage,
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
          provide: ModalService,
          useValue: modalServiceMock,
        },
      ],
    });
  });

  describe('ngOnInit', () => {
    describe('api call', () => {
      it('should trigger "getUserData$" method of api service', () => {
        component.ngOnInit();

        expect(usersApiServiceMock.getUserData$).toHaveBeenCalledTimes(1);
      });
    });

    describe('successful request', () => {
      it('should emit "setUserData" action of user storage', () => {
        component.ngOnInit();

        expect(usersStoreMock.setUserData).toHaveBeenCalledWith({});
      });
    });

    describe('failed request', () => {
      it('should emit "setError" action of user storage', () => {
        usersApiServiceMock.getUserData$.mockReturnValue(
          throwError(() => new HttpErrorResponse({ error: { message: 'error' } })),
        );

        component.ngOnInit();

        expect(usersStoreMock.setError).toHaveBeenCalledWith('error');
      });

      it('should open modal with correct options', () => {
        const expectedModalOptions = {
          component: UserDataFetchFailedComponent,
          canDismiss: expect.any(Function),
        };
        usersApiServiceMock.getUserData$.mockReturnValue(throwError(() => new HttpErrorResponse({ error: 'error' })));

        component.ngOnInit();

        expect(modalServiceMock.open$).toHaveBeenCalledWith(expect.objectContaining(expectedModalOptions));
      });
    });
  });
});
