import { fakeAsync, tick } from '@angular/core/testing';
import { ModalController, ModalOptions } from '@ionic/angular/standalone';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { take } from 'rxjs';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;
  let modalControllerMock: MockProxy<ModalController>;
  let presentSpy: jest.Mock;

  beforeEach(() => {
    presentSpy = jest.fn();

    modalControllerMock = mock<ModalController>();
    modalControllerMock.create.mockResolvedValue({ present: presentSpy } as any);

    service = classWithProviders({
      token: ModalService,
      providers: [
        {
          provide: ModalController,
          useValue: modalControllerMock,
        },
      ],
    });
  });

  describe('open$', () => {
    it('should trigger "create" method with target options', fakeAsync(() => {
      service
        .open$({} as ModalOptions)
        .pipe(take(1))
        .subscribe();
      tick();

      expect(modalControllerMock.create).toHaveBeenCalledWith({});
    }));

    it('should trigger "present" method to display toast', fakeAsync(() => {
      service
        .open$({} as ModalOptions)
        .pipe(take(1))
        .subscribe();
      tick();

      expect(presentSpy).toHaveBeenCalledTimes(1);
    }));
  });
});
