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
    it('should emit selected rarity value', () => {
      const testValue: string = 'SR';
      const spy = jest.spyOn(component.selectRarity, 'emit');

      component.onClick(testValue);

      expect(spy).toHaveBeenCalledWith(testValue);
    });
  });
});
