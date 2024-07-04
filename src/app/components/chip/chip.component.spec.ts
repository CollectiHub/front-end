import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { ChipComponent } from './chip.component';

describe(ChipComponent.name, () => {
  let component: ChipComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: ChipComponent,
      providers: [],
    });
  });

  describe('handleChipClick', () => {
    it('should emit selected chip value', () => {
      const chipId: string = 'R-007';
      const spy = jest.spyOn(component.clickChip, 'emit');

      component.handleChipClick(chipId);

      expect(spy).toHaveBeenCalledWith(chipId);
    });
  });
});
