import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
import { IonProgressBar } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

import { CardCountDetails, ProgressType } from './progress-bar.models';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [IonProgressBar, TranslateModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  type = input.required<ProgressType>();
  mode = input.required<CollectionProgressMode>();
  cardCountDetails = input.required<CardCountDetails>();

  getProgressLabel(type: ProgressType): string {
    return type === 'global' ? 'progress_bar.global_progress.label' : 'progress_bar.rarity_progress.label';
  }

  getProgressValue(cardDetails: CardCountDetails): number {
    return Number((cardDetails.collectedAmount / cardDetails.totalAmount).toFixed(2));
  }

  getFormattedProgressValue(mode: CollectionProgressMode, cardDetails: CardCountDetails): string {
    const { collectedAmount, totalAmount } = cardDetails;

    if (mode === 'percentages') {
      return `${Math.round((collectedAmount / totalAmount) * 100)} %`;
    }

    return `${collectedAmount} / ${totalAmount}`;
  }
}
