import { Card, CardStatus } from '@models/cards.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import { ChipsListComponent } from './chips-list.component';

describe(ChipsListComponent.name, () => {
  let component: ChipsListComponent;
  let translateServiceMock: MockProxy<TranslateService>;
  let toastServiceMock: MockProxy<ToastService>;

  beforeEach(() => {
    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockImplementation(a => a);

    toastServiceMock = mock<ToastService>();
    toastServiceMock.open$.mockReturnValue(of({} as HTMLIonToastElement));

    component = classWithProviders({
      token: ChipsListComponent,
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: ToastService,
          useValue: toastServiceMock,
        },
      ],
    });
  });

  describe('handleChipClick', () => {
    it('should translate message for toaster if the chip does not exist', () => {
      const card = {
        status: CardStatus.NotExisting,
      } as Card;

      component.handleChipClick(card);

      expect(translateServiceMock.instant).toHaveBeenCalledWith('collection.card_not_exists.toast');
    });

    it('should open toast if the chip does not exist', () => {
      const card = {
        status: CardStatus.NotExisting,
      } as Card;

      component.handleChipClick(card);

      expect(toastServiceMock.open$).toHaveBeenCalledWith('collection.card_not_exists.toast', ToastColor.Medium);
    });
  });
});
