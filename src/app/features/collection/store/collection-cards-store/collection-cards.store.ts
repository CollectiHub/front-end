import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { Card, UpdateCardsDto } from '@models/collection.models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { setEntities, updateEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchWith } from '@tools/rxjs/switch-with.operator';
import { pipe, switchMap } from 'rxjs';

import { CollectionApiService } from '../../services/collection-api.service';
import { CollectionInfoStore } from '../collection-info/collection-info.store';

import { COLLECTION_CARDS_INITIAL_STATE } from './collection-cards.state';

export const CollectionCardsStore = signalStore(
  { providedIn: 'root' },
  withState(COLLECTION_CARDS_INITIAL_STATE),
  withEntities<Card>(),
  withComputed(({ entities }) => ({
    // TODO: check why entities not set in store

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

    return {
      fatchByRarity: rxMethod<string>(
        pipe(
          switchMap((rarity: string) =>
            collectionApiService.getCardsByRarity$(rarity).pipe(
              tapResponse(
                (cards: Card[]) => patchState(store, setEntities(cards)),
                (error: HttpErrorResponse) => {
                  const errorMessage = error.error.message;

                  patchState(store, { error: errorMessage });
                },
              ),
            ),
          ),
        ),
      ),
      update: rxMethod<UpdateCardsDto>(
        pipe(
          switchWith((updateCardsData: UpdateCardsDto) => collectionApiService.updateCards$(updateCardsData)),
          tapResponse(
            ([updateCardsData, cardsCollected]: [UpdateCardsDto, number]) => {
              collectionInfoStore.updateCardsCollected(cardsCollected);

              patchState(store, updateEntities(updateCardsData));
            },
            (error: HttpErrorResponse) => {
              console.log(error);
              const errorMessage = error.error.message;

              patchState(store, { error: errorMessage });
            },
          ),
        ),
      ),
    };
  }),
);
