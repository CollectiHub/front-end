import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { Card, UpdateCardsDto } from '@models/collection.models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { setEntities, updateEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { asyncScheduler, mergeMap, observeOn, pipe, switchMap, tap } from 'rxjs';

import { CollectionApiService } from '../../services/collection-api.service';
import { CollectionInfoStore } from '../collection-info/collection-info.store';
import { SearchCardsStore } from '../search-cards/search-cards.store';

import { COLLECTION_CARDS_INITIAL_STATE } from './collection-cards.state';
import { CollectionCardsStoreFunctions } from './collection-cards.store.functions';

export const CollectionCardsStore = signalStore(
  { providedIn: 'root' },
  withState(COLLECTION_CARDS_INITIAL_STATE),
  withEntities<Card>(),
  withComputed(({ entities }) => ({
    cardsByRarity: computed(() => {
      return entities().reduce((memo: Record<string, Card[]>, card: Card) => {
        const cardsByRarity = memo[card.rarity] ?? [];

        cardsByRarity.push(card);

        memo[card.rarity] = cardsByRarity;

        return memo;
      }, {});
    }),
  })),

  withMethods(store => {
    const collectionApiService = inject(CollectionApiService);
    const collectionInfoStore = inject(CollectionInfoStore);
    const searchCardsStore = inject(SearchCardsStore);

    return {
      fatchByRarity: rxMethod<string>(
        pipe(
          observeOn(asyncScheduler),
          tap(() => patchState(store, { error: undefined, loading: true })),
          switchMap((rarity: string) =>
            collectionApiService.getCardsByRarity$(rarity).pipe(
              tapResponse({
                next: (cards: Card[]) => patchState(store, setEntities(cards), { loading: false }),
                error: (error: HttpErrorResponse) => {
                  const errorMessage = error.error.message;

                  patchState(store, { error: errorMessage, loading: false });
                },
              }),
            ),
          ),
        ),
      ),
      // TODO: Add functionality to toggle checkbox back in case if update failed
      update: rxMethod<UpdateCardsDto>(
        pipe(
          tap((updateCardsData: UpdateCardsDto) => {
            patchState(store, ({ cardsLoadingMap }) => {
              const updatedLoadingMap = CollectionCardsStoreFunctions.buildCardsLoadingMap(
                updateCardsData.ids,
                cardsLoadingMap,
                true,
              );

              return { cardsLoadingMap: updatedLoadingMap };
            });
          }),
          mergeMap((updateCardsData: UpdateCardsDto) =>
            collectionApiService.updateCards$(updateCardsData).pipe(
              tapResponse({
                next: (cardsCollected: number) => {
                  searchCardsStore.update(updateCardsData);

                  collectionInfoStore.updateCardsCollected(cardsCollected);

                  patchState(store, updateEntities(updateCardsData), ({ cardsLoadingMap }) => {
                    const updatedLoadingMap = CollectionCardsStoreFunctions.buildCardsLoadingMap(
                      updateCardsData.ids,
                      cardsLoadingMap,
                      false,
                    );

                    return { cardsLoadingMap: updatedLoadingMap };
                  });
                },
                error: (error: HttpErrorResponse) => {
                  const errorMessage = error.error.message;

                  patchState(store, ({ cardsLoadingMap }) => {
                    const updatedLoadingMap = CollectionCardsStoreFunctions.buildCardsLoadingMap(
                      updateCardsData.ids,
                      cardsLoadingMap,
                      false,
                    );

                    return { cardsLoadingMap: updatedLoadingMap, error: errorMessage };
                  });
                },
              }),
            ),
          ),
        ),
      ),
    };
  }),
);
