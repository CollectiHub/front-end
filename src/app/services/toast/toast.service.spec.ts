import { fakeAsync, tick } from '@angular/core/testing';
import { ToastController } from '@ionic/angular/standalone';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';

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
      service.open$({}).pipe(take(1)).subscribe();

      expect(toastControllerMock.create).toHaveBeenCalledWith({});
    });

    it('should trigger "present" method to display toast', fakeAsync(() => {
      const presentSpy = jest.fn();
      toastControllerMock.create.mockResolvedValue({
        present: presentSpy,
      } as any);

      service.open$({}).pipe(take(1)).subscribe();
      tick();

      expect(presentSpy).toHaveBeenCalledTimes(1);
    }));
  });

  describe('openWithListener$', () => {
    it('should trigger "open" method with target options', () => {
      const spy = jest.spyOn(service, 'open$');

      service.openWithListener$({}).pipe(take(1)).subscribe();

      expect(spy).toHaveBeenCalledWith({});
    });

    it('should trigger "onDidDismiss" method to know when toaster closed', () => {
      const didDismissSpy = jest.fn();
      jest.spyOn(service, 'open$').mockReturnValue(of({ onDidDismiss: didDismissSpy } as any));

      service.openWithListener$({}).pipe(take(1)).subscribe();

      expect(didDismissSpy).toHaveBeenCalledTimes(1);
    });
  });
});
