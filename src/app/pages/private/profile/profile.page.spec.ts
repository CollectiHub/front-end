import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { AlertEventRole } from '@models/app.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { AlertService } from '@services/alert/alert.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import ProfilePage from './profile.page';

describe(ProfilePage.name, () => {
  let component: ProfilePage;
  let usersStoreMock: MockProxy<UsersStoreMock>;
  let alertServiceMock: MockProxy<AlertService>;
  let translateServiceMock: MockProxy<TranslateService>;

  beforeEach(() => {
    usersStoreMock = mock<UsersStoreMock>();

    alertServiceMock = mock<AlertService>();
    alertServiceMock.openWithListener$.mockReturnValue(of({}));

    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockImplementation(k => k);

    component = classWithProviders({
      token: ProfilePage,
      providers: [
        {
          provide: UsersStore,
          useValue: usersStoreMock,
        },
        {
          provide: AlertService,
          useValue: alertServiceMock,
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    });
  });

  describe('deleteAccount', () => {
    it('should open alert with correct config', () => {
      const expectedAlertOptions = {
        message: 'profile.detele_acount_alert.message',
        buttons: [
          {
            text: 'profile.detele_acount_alert.cancel_btn',
            role: AlertEventRole.Cancel,
          },
          {
            text: 'profile.detele_acount_alert.confirm_btn',
            role: AlertEventRole.Confirm,
          },
        ],
      };

      component.deleteAccount();

      expect(alertServiceMock.openWithListener$).toHaveBeenCalledWith(expectedAlertOptions);
    });

    it('should translate message for alert', () => {
      component.deleteAccount();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('profile.detele_acount_alert.message');
    });

    it('should translate confirm button text for alert', () => {
      component.deleteAccount();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('profile.detele_acount_alert.confirm_btn');
    });

    it('should translate cancel button text for alert', () => {
      component.deleteAccount();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('profile.detele_acount_alert.cancel_btn');
    });

    it('should emit "deleteUser" event of usersStore if alert was confirmed', () => {
      alertServiceMock.openWithListener$.mockReturnValue(of({ role: AlertEventRole.Confirm }));

      component.deleteAccount();

      expect(usersStoreMock.deleteUser).toHaveBeenCalledTimes(1);
    });

    it('should not emit "deleteUser" event of usersStore if alert was not confirmed', () => {
      alertServiceMock.openWithListener$.mockReturnValue(of({ role: AlertEventRole.Cancel }));

      component.deleteAccount();

      expect(usersStoreMock.deleteUser).not.toHaveBeenCalled();
    });
  });
});
