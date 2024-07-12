import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from '@features/collection/components/card/card.component';
import { stubCardList } from '@features/collection/components/card-list/card-list.stub';
import { Card } from '@models/collection.models';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  cardList = signal<Card[]>(stubCardList);
  cardsPendingResponse = signal<string[]>([]);

  getLoadingStatus(cardIds: string[], cardId: string): boolean {
    return cardIds.includes(cardId);
  }

  handleCardClick(cardId: string): void {
    // TO DO
  }

  handleCheckboxClick(cardId: string): void {
    // TO DO
  }
}
