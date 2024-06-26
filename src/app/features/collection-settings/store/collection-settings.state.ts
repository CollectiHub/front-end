import { CardsDisplayMode, CollectionProgressMode } from '@features/collection-settings/collection-settings.models';

import { CollectionSettingsState } from './collection-settings.store.models';

export const COLLECTION_SETTINGS_INITIAL_STATE: CollectionSettingsState = {
  globalProgressDisplayMode: CollectionProgressMode.Numbers,
  rarityProgressDisplayMode: CollectionProgressMode.Percentages,
  cardsDisplayMode: CardsDisplayMode.Chip,
  selectedRarity: 'R',
};
