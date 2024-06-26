import { SegmentCustomEvent } from '@ionic/angular/standalone';
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

  describe('handleRarityChange', () => {
    it('should emit selected rarity value', () => {
      const testValue: string = 'SR';
      const segmentEventMock = { detail: { value: testValue } } as SegmentCustomEvent;
      const spy = jest.spyOn(component.selectRarity, 'emit');

      component.handleRarityChange(segmentEventMock);

      expect(spy).toHaveBeenCalledWith(testValue);
    });

    it('should not emit value when it is empty string', () => {
      const segmentEventMock = { detail: { value: '' } } as SegmentCustomEvent;
      const spy = jest.spyOn(component.selectRarity, 'emit');

      component.handleRarityChange(segmentEventMock);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit value when it is a number', () => {
      const segmentEventMock = { detail: { value: 777 } } as SegmentCustomEvent;
      const spy = jest.spyOn(component.selectRarity, 'emit');

      component.handleRarityChange(segmentEventMock);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit value when it is undefined', () => {
      const segmentEventMock = { detail: { value: undefined } } as SegmentCustomEvent;
      const spy = jest.spyOn(component.selectRarity, 'emit');

      component.handleRarityChange(segmentEventMock);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
