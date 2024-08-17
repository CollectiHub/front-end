import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { ChipComponent } from '@components/chip/chip.component';
import { Card, CardStatus } from '@models/collection.models';
import { TranslateService } from '@ngx-translate/core';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-chips-list',
  standalone: true,
  imports: [ChipComponent],
  templateUrl: './chips-list.component.html',
  styleUrl: './chips-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsListComponent {
  private readonly translateService = inject(TranslateService);
  private readonly toastService = inject(ToastService);

  cardsList = input.required<Card[]>();
  chipClicked = output<Card>();

  chipsPendingResponse = signal<string[]>([]);

  getLoadingStatus(chipIds: string[], chipId: string): boolean {
    return chipIds.includes(chipId);
  }

  handleChipClick(card: Card): void {
    if (card.status === CardStatus.NotExisting) {
      const message = this.translateService.instant('collection.card_not_exists.toast');
      this.toastService.open$(message, ToastColor.Medium).pipe(take(1)).subscribe();

      return;
    } else {
      this.chipClicked.emit(card);
    }
  }
}
