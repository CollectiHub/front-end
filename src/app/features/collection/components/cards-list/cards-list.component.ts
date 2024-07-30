import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { Card, CardStatus } from '@models/collection.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CardComponent, TranslateModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListComponent {
  private readonly translateService = inject(TranslateService);
  private readonly toastService = inject(ToastService);

  cardList = input.required<Card[] | null>();
  cardsPendingResponse = signal<string[]>([]);

  getLoadingStatus(cardIds: string[], cardId: string): boolean {
    return cardIds.includes(cardId);
  }

  handleCardClick(cardId: string, card: Card): void {
    if (card.status === CardStatus.NotExisting) {
      const message = this.translateService.instant('collection.card_not_exists.toast');
      this.toastService.open$(message, ToastColor.Medium).pipe(take(1)).subscribe();

      return;
    }

    // TO DO
  }

  handleCheckboxClick(cardId: string): void {
    // TO DO
  }
}
