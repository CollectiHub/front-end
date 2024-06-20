import { fakeAsync, tick } from '@angular/core/testing';
import { ToastController } from '@ionic/angular/standalone';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';

import { ToastColor } from './toast.models';
import { ToastService } from './toast.service';

describe(ToastService.name, () => {
  let service: ToastService;
  let toastControllerMock: MockProxy<ToastController>;

  beforeEach(() => {
    toastControllerMock = mock<ToastController>({ create: jest.fn(() => of({})) } as any);

    service = classWithProviders({
      token: ToastService,
      providers: [
        {
          provide: ToastController,
          useValue: toastControllerMock,
        },
      ],
    });
  });

  describe('open$', () => {
    it('should trigger "create" method with target options', () => {
      const expectedToastConfig = {
        duration: 3000,
        cssClass: 'app-toast',
        position: 'bottom',
        message: 'message',
        color: ToastColor.Success,
        buttons: [{ icon: 'close-outline', role: 'cancel' }],
      };

      service.open$('message', ToastColor.Success).pipe(take(1)).subscribe();

      expect(toastControllerMock.create).toHaveBeenCalledWith(expectedToastConfig);
    });

    it('should trigger "present" method to display toast', fakeAsync(() => {
      const presentSpy = jest.fn();
      toastControllerMock.create.mockResolvedValue({
        present: presentSpy,
      } as any);

      service.open$('message', ToastColor.Success).pipe(take(1)).subscribe();
      tick();

      expect(presentSpy).toHaveBeenCalledTimes(1);
    }));
  });
});
