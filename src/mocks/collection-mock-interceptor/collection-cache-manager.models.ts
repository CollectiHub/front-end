import { Card } from '@models/collection.models';

export interface CollectionCache {
  cards: Card[];
  cards_total: number;
  cards_collected: number;
}
