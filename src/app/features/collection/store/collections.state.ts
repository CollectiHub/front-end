import { CollectionInitialState } from './collection.store.models';

export const COLLECTION_INITIAL_STATE: CollectionInitialState = {
  cardsMap: new Map(),
  collectionInfo: undefined,
  error: undefined,
};
