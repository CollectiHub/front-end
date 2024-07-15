import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { mock } from 'jest-mock-extended';

import { CardComponent } from './card.component';

describe(CardComponent.name, () => {
  let component: CardComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: CardComponent,
      providers: [],
    });
  });

  describe('handleCardClick', () => {
    it('should emit selected card value', () => {
      const cardId: string = 'R-007';
      const spy = jest.spyOn(component.clickCard, 'emit');

      component.handleCardClick(cardId);

      expect(spy).toHaveBeenCalledWith(cardId);
    });
  });

  describe('handleCheckboxClick', () => {
    it('should stop event propagation', () => {
      const eventMock = mock<MouseEvent>();

      component.handleCheckboxClick(eventMock, 'R-007');

      expect(eventMock.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should emit selected card value', () => {
      const eventMock = mock<MouseEvent>();
      const cardId: string = 'R-007';
      const spy = jest.spyOn(component.clickCheckbox, 'emit');

      component.handleCheckboxClick(eventMock, cardId);

      expect(spy).toHaveBeenCalledWith(cardId);
    });
  });

  describe('handleLoadImageError', () => {
    it('should set the image src to the placeholder', () => {
      const placeholderSrc = 'assets/img/card-load-failed.jpg';
      const imageElement = { src: '' };
      const eventMock = { target: imageElement } as unknown as ErrorEvent;

      component.handleImageLoadError(eventMock);

      expect(imageElement.src).toBe(placeholderSrc);
    });
  });
});
