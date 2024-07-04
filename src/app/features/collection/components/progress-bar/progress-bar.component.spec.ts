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

  describe('getProgressLabel', () => {
    it('should return "progress_bar.global_progress.label" text if progress type "global"', () => {
      const result = component.getProgressLabel('global');

      expect(result).toBe('progress_bar.global_progress.label');
    });

    it('should return "progress_bar.rarity_progress.label" text if progress type "rarity"', () => {
      const result = component.getProgressLabel('rarity');

      expect(result).toBe('progress_bar.rarity_progress.label');
    });
  });

  describe('getProgressValue', () => {
    it('should return correct progress value', () => {
      const cardCountDetails = { collectedAmount: 55, totalAmount: 100 };
      const result = component.getProgressValue(cardCountDetails);

      expect(result).toBe(0.55);
    });
  });

  describe('getFormattedProgressValue', () => {
    it('should return a string of the form "{percentage integer} %" in "percentages" mode', () => {
      const cardCountDetails = { collectedAmount: 10, totalAmount: 100 };
      const result = component.getFormattedProgressValue(CollectionProgressMode.Percentages, cardCountDetails);

      expect(result).toBe('10 %');
    });

    it('should return a string of the form "{collectedAmount} / {totalAmount}" in "numbers" mode', () => {
      const cardCountDetails = { collectedAmount: 55, totalAmount: 100 };
      const result = component.getFormattedProgressValue(CollectionProgressMode.Numbers, cardCountDetails);

      expect(result).toBe('55 / 100');
    });
  });
});
