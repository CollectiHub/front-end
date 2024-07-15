import { Card, CardStatus } from '@models/collection.models';
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

  describe('getLoadingStatus', () => {
    it('should return true if cardId is present in cardsPendingResponse', () => {
      const cardId: string = 'R-007';

      const isLoading = component.getLoadingStatus([cardId], cardId);

      expect(isLoading).toBe(true);
    });

    it('should return false if cardId is not present in cardsPendingResponse', () => {
      const cardId: string = 'R-007';

      const isLoading = component.getLoadingStatus(['R-005'], cardId);

      expect(isLoading).toBe(false);
    });
  });

  describe('handleCardClick', () => {
    it('should translate message for toaster if the card does not exist', () => {
      const card = {
        status: CardStatus.NotExisting,
      } as Card;

      component.handleCardClick('id-002', card);

      expect(translateServiceMock.instant).toHaveBeenCalledWith('collection.card_not_exists.toast');
    });

    it('should open toast if the card does not exist', () => {
      const card = {
        status: CardStatus.NotExisting,
      } as Card;

      component.handleCardClick('id-002', card);

      expect(toastServiceMock.open$).toHaveBeenCalledWith('collection.card_not_exists.toast', ToastColor.Medium);
    });
  });
});
