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

  describe('getIsCardsListEmpty', () => {
    it('should return true if list is null', () => {
      const cardsList = null;

      const result = component.getIsCardsListEmpty(cardsList);

      expect(result).toBeTruthy();
    });

    it('should return true if list is empty', () => {
      const cardsList: Card[] = [];

      const result = component.getIsCardsListEmpty(cardsList);

      expect(result).toBeTruthy();
    });

    it('should return false if list is not empty', () => {
      const cardsList: Card[] = [{} as Card];

      const result = component.getIsCardsListEmpty(cardsList);

      expect(result).toBeFalsy();
    });
  });

  describe('getIsEveryCardCollected', () => {
    it('should return false is list is null', () => {
      const result = component.getIsEveryCardCollected(null);

      expect(result).toBeFalsy();
    });

    it('should return true if every card is collected or nonexistent', () => {
      const cardsList: Card[] = [{ status: CardStatus.Collected } as Card, { status: CardStatus.NotExisting } as Card];

      const result = component.getIsEveryCardCollected(cardsList);

      expect(result).toBeTruthy();
    });

    it('should return false if some card is not collected', () => {
      const cardsList: Card[] = [{ status: CardStatus.NotCollected } as Card, { status: CardStatus.Collected } as Card];

      const result = component.getIsEveryCardCollected(cardsList);

      expect(result).toBeFalsy();
    });
  });

  describe('handleMarkAllAsCollectedClick', () => {
    it('should not emit event is list is empty', () => {
      const spy = jest.spyOn(component.markAllAsCollectedClicked, 'emit');

      component.handleMarkAllAsCollectedClick(null);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should emit event if list is not empty', () => {
      const spy = jest.spyOn(component.markAllAsCollectedClicked, 'emit');

      component.handleMarkAllAsCollectedClick([]);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
