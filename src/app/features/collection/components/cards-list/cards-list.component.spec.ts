import { Card, CardStatus } from '@models/cards.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import { CardsListComponent } from './cards-list.component';

describe(CardsListComponent.name, () => {
  let component: CardsListComponent;
  let translateServiceMock: MockProxy<TranslateService>;
  let toastServiceMock: MockProxy<ToastService>;

  beforeEach(() => {
    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockImplementation(a => a);

    toastServiceMock = mock<ToastService>();
    toastServiceMock.open$.mockReturnValue(of({} as HTMLIonToastElement));

    component = classWithProviders({
      token: CardsListComponent,
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

  describe('handleCardClick', () => {
    it('should translate message for toaster if the card does not exist', () => {
      const card = {
        status: CardStatus.NotExisting,
      } as Card;

      component.handleCardClick(card);

      expect(translateServiceMock.instant).toHaveBeenCalledWith('collection.card_not_exists.toast');
    });

    it('should open toast if the card does not exist', () => {
      const card = {
        status: CardStatus.NotExisting,
      } as Card;

      component.handleCardClick(card);

      expect(toastServiceMock.open$).toHaveBeenCalledWith('collection.card_not_exists.toast', ToastColor.Medium);
    });
  });
});
