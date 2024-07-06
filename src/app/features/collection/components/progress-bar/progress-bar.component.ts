import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
import { IonProgressBar } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [IonProgressBar, TranslateModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  label = input.required<string>();
  maxValue = input.required<number>();
  currentValue = input.required<number>();
  displayMode = input.required<CollectionProgressMode>();

  progressValue = computed(() => this.getProgressValue(this.currentValue(), this.maxValue()));
  formattedProgressValue = computed(() =>
    this.getFormattedProgressValue(this.currentValue(), this.maxValue(), this.displayMode()),
  );

  private getProgressValue(currentValue: number, maxValue: number): number {
    const progressValue = parseFloat((currentValue / maxValue).toFixed(2));
    const isValidProgressValue = !isNaN(progressValue) && isFinite(progressValue);

    if (!isValidProgressValue) {
      throw Error('Progress value is invalid');
    }

    return progressValue;
  }

  private getFormattedProgressValue(currentValue: number, maxValue: number, mode: CollectionProgressMode): string {
    if (mode === CollectionProgressMode.Percentages) {
      return `${((currentValue / maxValue) * 100).toFixed(2)} %`;
    }

    return `${currentValue} / ${maxValue}`;
  }
}
