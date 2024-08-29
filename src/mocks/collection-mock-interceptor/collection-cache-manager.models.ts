import { Card } from '@models/cards.models';

export interface CollectionCache {
  cards: Card[];
  cards_total: number;
  cards_collected: number;
}
