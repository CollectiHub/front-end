import { CollectionInfoState } from './collection-info.store.models';

export const COLLECTION_INFO_INITIAL_STATE: CollectionInfoState = {
  error: undefined,
  loading: true,
  cards_collected: undefined,
  cards_total: undefined,
  rarities: undefined,
};
