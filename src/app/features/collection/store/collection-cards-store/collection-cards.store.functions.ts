import { CardsLoadingMap } from './collection-cards.store.models';

export namespace CollectionCardsStoreFunctions {
  export const buildCardsLoadingMap = (
    cardsIds: string[],
    existingMap: CardsLoadingMap,
    isLoading: boolean,
  ): CardsLoadingMap =>
    cardsIds.reduce((memo: Record<string, boolean>, id: string) => ({ ...memo, [id]: isLoading }), existingMap);
}
