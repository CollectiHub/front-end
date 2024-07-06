import { CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { ProgressBarComponent } from './progress-bar.component';

describe(ProgressBarComponent.name, () => {
  let component: ProgressBarComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: ProgressBarComponent,
      providers: [],
    });
  });

  describe('getProgressValue', () => {
    it('should return correct progress value', () => {
      const result = component['getProgressValue'](55, 100);

      expect(result).toBe(0.55);
    });

    it('should throw the error "Progress value is invalid" if result is Infinity', () => {
      expect(() => component['getProgressValue'](10, 0)).toThrow('Progress value is invalid');
    });

    it('should throw the error "Progress value is invalid" if result is NaN', () => {
      expect(() => component['getProgressValue'](10, NaN)).toThrow('Progress value is invalid');
    });
  });

  describe('getFormattedProgressValue', () => {
    it('should return a string of the form "{percentage float(2 decimals)} %" in "percentages" mode', () => {
      const result = component['getFormattedProgressValue'](10, 100, CollectionProgressMode.Percentages);

      expect(result).toBe('10.00 %');
    });

    it('should return a string of the form "{collectedAmount} / {totalAmount}" in "numbers" mode', () => {
      const result = component['getFormattedProgressValue'](55, 100, CollectionProgressMode.Numbers);

      expect(result).toBe('55 / 100');
    });
  });
});
