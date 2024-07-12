import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { CardListComponent } from './card-list.component';

describe(CardListComponent.name, () => {
  let component: CardListComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: CardListComponent,
      providers: [],
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
});
