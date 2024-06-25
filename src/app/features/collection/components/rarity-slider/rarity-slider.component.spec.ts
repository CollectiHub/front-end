import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { RaritySliderComponent } from './rarity-slider.component';

describe(RaritySliderComponent.name, () => {
  let component: RaritySliderComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: RaritySliderComponent,
      providers: [],
    });
  });

  describe('onClick', () => {
    it('should set the current selected rarity', () => {
      const testValue: string = 'R';

      component.onClick(testValue);

      expect(component.currentSelectedRarity()).toBe(testValue);
    });

    it('should emit selected rarity value', () => {
      const testValue: string = 'SR';
      const spyon = jest.spyOn(component.selectRarity, 'emit');

      component.onClick(testValue);

      expect(spyon).toHaveBeenCalledWith(testValue);
    });
  });
});
