import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardComponent } from '@features/collection/components/card/card.component';
import { stubCardList } from '@features/collection/components/card-list/card-list.stub';
import { Card, StatusCard } from '@models/collection.models';
import { TranslateService } from '@ngx-translate/core';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  private readonly translateService = inject(TranslateService);
  private readonly toastService = inject(ToastService);

  cardList = signal<Card[]>(stubCardList);
  cardsPendingResponse = signal<string[]>([]);

  getLoadingStatus(cardIds: string[], cardId: string): boolean {
    return cardIds.includes(cardId);
  }

  handleCardClick(cardId: string, card: Card): void {
    if (card.status === StatusCard.NotExisting) {
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
