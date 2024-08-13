import { Card } from '@models/collection.models';

import { CollectionInfoDto } from '../collection.models';

export interface CollectionInitialState {
  cardsMap: { [key: string]: Map<string, Card> };
  collectionInfo: CollectionInfoDto | undefined;
  error: string | undefined;
}
