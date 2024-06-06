import { AppConstants } from '@constants/app.constants';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { GenericApiResponse } from '@models/api.models';
import { AlertEventRole } from '@models/app.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { AlertService } from '@services/alert/alert.service';
import { ToastService } from '@services/toast/toast.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import ProfilePage from './profile.page';

describe(ProfilePage.name, () => {
  let component: ProfilePage;
  let usersStoreMock: MockProxy<UsersStoreMock>;
  let alertServiceMock: MockProxy<AlertService>;
  let translateServiceMock: MockProxy<TranslateService>;
  let usersApiServiceMock: MockProxy<UsersApiService>;
  let toastServiceMock: MockProxy<ToastService>;

  beforeEach(() => {
    usersStoreMock = mock<UsersStoreMock>();
    usersStoreMock.userData.mockReturnValue({ email: 'email@gg.gg' });

    alertServiceMock = mock<AlertService>();
    alertServiceMock.openWithListener$.mockReturnValue(of({}));

    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockImplementation(k => k);

    usersApiServiceMock = mock<UsersApiService>();
    usersApiServiceMock.resendVerificationEmail$.mockReturnValue(of({} as GenericApiResponse));

    toastServiceMock = mock<ToastService>();
    toastServiceMock.open$.mockReturnValue(of({} as HTMLIonToastElement));

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
        {
          provide: UsersApiService,
          useValue: usersApiServiceMock,
        },
        {
          provide: ToastService,
          useValue: toastServiceMock,
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
            text: 'alert.cancel_button',
            role: AlertEventRole.Cancel,
          },
          {
            text: 'alert.confirm_button',
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

      expect(translateServiceMock.instant).toHaveBeenCalledWith('alert.confirm_button');
    });

    it('should translate cancel button text for alert', () => {
      component.deleteAccount();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('alert.cancel_button');
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

  describe('logout', () => {
    it('should open alert with correct config', () => {
      const expectedAlertOptions = {
        message: 'profile.logout_alert.message',
        buttons: [
          {
            text: 'alert.cancel_button',
            role: AlertEventRole.Cancel,
          },
          {
            text: 'alert.confirm_button',
            role: AlertEventRole.Confirm,
          },
        ],
      };

      component.logout();

      expect(alertServiceMock.openWithListener$).toHaveBeenCalledWith(expectedAlertOptions);
    });

    it('should translate message for alert', () => {
      component.logout();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('profile.logout_alert.message');
    });

    it('should translate confirm button text for alert', () => {
      component.logout();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('alert.confirm_button');
    });

    it('should translate cancel button text for alert', () => {
      component.logout();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('alert.cancel_button');
    });

    it('should emit "logout" event of usersStore if alert was confirmed', () => {
      alertServiceMock.openWithListener$.mockReturnValue(of({ role: AlertEventRole.Confirm }));

      component.logout();

      expect(usersStoreMock.logout).toHaveBeenCalledTimes(1);
    });

    it('should not emit "logout" event of usersStore if alert was not confirmed', () => {
      alertServiceMock.openWithListener$.mockReturnValue(of({ role: AlertEventRole.Cancel }));

      component.logout();

      expect(usersStoreMock.logout).not.toHaveBeenCalled();
    });
  });

  describe('requestEmailVerification', () => {
    it('should stop event propagation', () => {
      const eventMock = mock<MouseEvent>();

      component.requestEmailVerification(eventMock);

      expect(eventMock.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should trigger "resendVerificationEmail$" api request', () => {
      component.requestEmailVerification(mock<MouseEvent>());

      expect(usersApiServiceMock.resendVerificationEmail$).toHaveBeenCalledTimes(1);
    });
  });

  it('should translate message for toaster', () => {
    component.requestEmailVerification(mock<MouseEvent>());

    expect(translateServiceMock.instant).toHaveBeenCalledWith('profile.verify_email_toast', { email: 'email@gg.gg' });
  });

  it('should open toast in case of successful request', () => {
    const expectedToastConfig = {
      message: 'profile.verify_email_toast',
      duration: AppConstants.toastDuration,
      cssClass: 'app-toast',
      position: 'bottom',
      color: 'success',
      buttons: [{ icon: 'close-outline', role: 'cancel' }],
    };

    component.requestEmailVerification(mock<MouseEvent>());

    expect(toastServiceMock.open$).toHaveBeenCalledWith(expectedToastConfig);
  });
});
