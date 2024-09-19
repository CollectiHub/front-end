import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
import { IonProgressBar, IonSkeletonText } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [IonProgressBar, TranslateModule, IonSkeletonText],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  label = input.required<string>();
  isLoading = input.required<boolean>();
  maxValue = input.required<number>();
  currentValue = input.required<number>();
  displayMode = input.required<CollectionProgressMode>();

  progressValue = computed(() => {
    if (!this.isCountInputValuesSet(this.currentValue(), this.maxValue())) {
      return;
    }

    if (!this.isCountInputValuesValid(this.currentValue(), this.maxValue())) {
      return 0;
    }

    return this.getProgressValue(this.currentValue(), this.maxValue());
  });

  formattedProgressValue = computed(() => {
    if (!this.isCountInputValuesSet(this.currentValue(), this.maxValue())) {
      return;
    }

    if (!this.isCountInputValuesValid(this.currentValue(), this.maxValue())) {
      return 'n/a';
    }

    return this.getFormattedProgressValue(this.currentValue(), this.maxValue(), this.displayMode());
  });

  private getProgressValue(currentValue: number, maxValue: number): number {
    return parseFloat((currentValue / maxValue).toFixed(2));
  }

  private getFormattedProgressValue(currentValue: number, maxValue: number, mode: CollectionProgressMode): string {
    if (mode === CollectionProgressMode.Percentages) {
      return `${((currentValue / maxValue) * 100).toFixed(2)} %`;
    }

    return `${currentValue} / ${maxValue}`;
  }

  private isCountInputValuesSet(currentValue: unknown, maxValue: unknown): boolean {
    return currentValue !== undefined && maxValue !== undefined;
  }

  private isCountInputValuesValid(currentValue: number, maxValue: number): boolean {
    const isValuesInteger = Number.isInteger(currentValue) && Number.isInteger(maxValue);
    const isValuesValid = currentValue >= 0 && maxValue > 0;

    return isValuesInteger && isValuesValid;
  }
}
