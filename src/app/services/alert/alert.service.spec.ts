import { fakeAsync, tick } from '@angular/core/testing';
import { AlertController } from '@ionic/angular/standalone';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';

import { AlertService } from './alert.service';

describe(AlertService.name, () => {
  let service: AlertService;
  let alertControllerMock: MockProxy<AlertController>;
  let presentSpy: jest.Mock;
  let didDismissSpy: jest.Mock;

  beforeEach(() => {
    presentSpy = jest.fn();
    didDismissSpy = jest.fn(() => of(undefined));

    alertControllerMock = mock<AlertController>({ create: jest.fn(() => of({})) } as any);
    alertControllerMock.create.mockResolvedValue({
      present: presentSpy,
      onDidDismiss: didDismissSpy,
    } as any);

    service = classWithProviders({
      token: AlertService,
      providers: [
        {
          provide: AlertController,
          useValue: alertControllerMock,
        },
      ],
    });
  });

  describe('openWithListener$', () => {
    it('should trigger "open" method with target options', () => {
      service.openWithListener$({}).pipe(take(1)).subscribe();

      expect(alertControllerMock.create).toHaveBeenCalledWith({});
    });

    it('should trigger "present" method to display alert', fakeAsync(() => {
      service.openWithListener$({}).pipe(take(1)).subscribe();
      tick();

      expect(presentSpy).toHaveBeenCalledTimes(1);
    }));

    it('should trigger "onDidDismiss" method to know when alert closed', fakeAsync(() => {
      service.openWithListener$({}).pipe(take(1)).subscribe();
      tick();

      expect(didDismissSpy).toHaveBeenCalledTimes(1);
    }));
  });
});
