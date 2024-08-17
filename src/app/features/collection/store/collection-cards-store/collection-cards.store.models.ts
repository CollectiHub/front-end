import { Card } from '@models/collection.models';

export interface CollectionCardsState {
  error: string | undefined;
  loading: boolean;
}

export interface UpdateCardEntityPatch {
  ids: string[];
  changes: Partial<Card>;
}
