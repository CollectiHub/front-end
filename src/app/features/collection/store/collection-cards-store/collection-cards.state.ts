import { CollectionCardsState } from './collection-cards.store.models';

export const COLLECTION_CARDS_INITIAL_STATE: CollectionCardsState = {
  error: undefined,
  loading: true,
  cardsLoadingMap: {},
};
