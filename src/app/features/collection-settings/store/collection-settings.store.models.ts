import { CardsDisplayMode, CollectionProgressMode } from '../collection-settings.models';

export interface CollectionSettingsState {
  globalProgressDisplayMode: CollectionProgressMode;
  rarityProgressDisplayMode: CollectionProgressMode;
  cardsDisplayMode: CardsDisplayMode;
  selectedRarity: string;
}
