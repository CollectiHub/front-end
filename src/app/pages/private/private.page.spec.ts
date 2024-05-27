import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import PrivatePage from './private.page';

describe('PrivatePage', () => {
  let component: PrivatePage;
  let usersStoreMock: MockProxy<UsersStoreMock>;

  beforeEach(() => {
    usersStoreMock = mock<UsersStoreMock>();

    component = classWithProviders({
      token: PrivatePage,
      providers: [
        {
          provide: UsersStore,
          useValue: usersStoreMock,
        },
      ],
    });
  });

  describe('ngOnInit', () => {
    it('should trigger "loadUserData" method of storage', () => {
      component.ngOnInit();

      expect(usersStoreMock.loadUserData).toHaveBeenCalledTimes(1);
    });
  });
});
