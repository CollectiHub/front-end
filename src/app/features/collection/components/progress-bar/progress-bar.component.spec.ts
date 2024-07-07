import { signal } from '@angular/core';
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

  describe('progressValue', () => {
    it('should return correct progress value', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(100) as any;

      expect(component.progressValue()).toBe(0.55);
    });

    it('should return undefined if maxValue is not set', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(undefined) as any;

      expect(component.progressValue()).toBe(undefined);
    });

    it('should return 0 if maxValue is NaN', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(NaN) as any;

      expect(component.progressValue()).toBe(0);
    });

    it('should return 0 if maxValue is 0', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(0) as any;

      expect(component.progressValue()).toBe(0);
    });

    it('should return 0 if maxValue is Infinity', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(Infinity) as any;

      expect(component.progressValue()).toBe(0);
    });

    it('should return 0 if maxValue is not Integer', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(100.44) as any;

      expect(component.progressValue()).toBe(0);
    });

    it('should return 0 if maxValue is negative Number', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(-1) as any;

      expect(component.progressValue()).toBe(0);
    });

    it('should return undefined if currentValue is not set', () => {
      component.currentValue = signal(undefined) as any;
      component.maxValue = signal(100) as any;

      expect(component.progressValue()).toBe(undefined);
    });

    it('should return 0 if currentValue is NaN', () => {
      component.currentValue = signal(NaN) as any;
      component.maxValue = signal(100) as any;

      expect(component.progressValue()).toBe(0);
    });

    it('should return 0 if currentValue is Infinity', () => {
      component.currentValue = signal(Infinity) as any;
      component.maxValue = signal(100) as any;

      expect(component.progressValue()).toBe(0);
    });

    it('should return 0 if currentValue is not Integer', () => {
      component.currentValue = signal(5.5) as any;
      component.maxValue = signal(100) as any;

      expect(component.progressValue()).toBe(0);
    });

    it('should return 0 if currentValue is negative Number', () => {
      component.currentValue = signal(-5) as any;
      component.maxValue = signal(100) as any;

      expect(component.progressValue()).toBe(0);
    });
  });

  describe('formattedProgressValue', () => {
    it('should return a string of the form "{percentage float(2 decimals)} %" in "percentages" mode', () => {
      component.currentValue = signal(10) as any;
      component.maxValue = signal(100) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('10.00 %');
    });

    it('should return a string of the form "{collectedAmount} / {totalAmount}" in "numbers" mode', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(100) as any;
      component.displayMode = signal(CollectionProgressMode.Numbers) as any;

      expect(component.formattedProgressValue()).toBe('55 / 100');
    });

    it('should return undefined if maxValue is not set', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(undefined) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe(undefined);
    });

    it('should return "n/a" if maxValue is NaN', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(NaN) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('n/a');
    });

    it('should return "n/a" if maxValue is 0', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(0) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('n/a');
    });

    it('should return "n/a" if maxValue is Infinity', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(Infinity) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('n/a');
    });

    it('should return "n/a" if maxValue is not Integer', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(100.44) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('n/a');
    });

    it('should return "n/a" if maxValue is negative Number', () => {
      component.currentValue = signal(55) as any;
      component.maxValue = signal(-1) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('n/a');
    });

    it('should return undefined if currentValue is not set', () => {
      component.currentValue = signal(undefined) as any;
      component.maxValue = signal(100) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe(undefined);
    });

    it('should return "n/a" if currentValue is NaN', () => {
      component.currentValue = signal(NaN) as any;
      component.maxValue = signal(100) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('n/a');
    });

    it('should return "n/a" if currentValue is Infinity', () => {
      component.currentValue = signal(Infinity) as any;
      component.maxValue = signal(100) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('n/a');
    });

    it('should return "n/a" if currentValue is not Integer', () => {
      component.currentValue = signal(5.5) as any;
      component.maxValue = signal(100) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('n/a');
    });

    it('should return "n/a" if currentValue is negative Number', () => {
      component.currentValue = signal(-5) as any;
      component.maxValue = signal(100) as any;
      component.displayMode = signal(CollectionProgressMode.Percentages) as any;

      expect(component.formattedProgressValue()).toBe('n/a');
    });
  });
});
