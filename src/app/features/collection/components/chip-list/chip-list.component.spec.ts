import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { ChipListComponent } from './chip-list.component';

describe(ChipListComponent.name, () => {
  let component: ChipListComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: ChipListComponent,
      providers: [],
    });
  });

  describe('getLoadingStatus', () => {
    it('should return true if chipId is present in chipsPendingResponse', () => {
      const chipId: string = 'R-007';

      const isLoading = component.getLoadingStatus([chipId], chipId);

      expect(isLoading).toBe(true);
    });

    it('should return false if chipId is not present in chipsPendingResponse', () => {
      const chipId: string = 'R-007';

      const isLoading = component.getLoadingStatus(['R-005'], chipId);

      expect(isLoading).toBe(false);
    });
  });

  describe('handleChipClick', () => {
    it('should', () => {});
  });
});
