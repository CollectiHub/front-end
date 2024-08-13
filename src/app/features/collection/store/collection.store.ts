import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Card } from '@models/collection.models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchWith } from '@tools/rxjs/switch-with.operator';
import { pipe, switchMap } from 'rxjs';

import { CollectionInfoDto } from '../collection.models';
import { CollectionApiService } from '../services/collection-api.service';

import { COLLECTION_INITIAL_STATE } from './collections.state';

export const CollectionStore = signalStore(
  { providedIn: 'root' },
  withState(COLLECTION_INITIAL_STATE),
  withMethods(store => {
    const collectionApiService = inject(CollectionApiService);

    return {
      fatchCollectionInfo: rxMethod<void>(
        pipe(
          switchMap(() => collectionApiService.getCollectionInfo$()),
          tapResponse(
            (collectionInfo: CollectionInfoDto) => patchState(store, { collectionInfo }),
            (error: HttpErrorResponse) => {
              const errorMessage = error.error.message;

              patchState(store, { error: errorMessage });
            },
          ),
        ),
      ),
      fatchByRarity: rxMethod<string>(
        pipe(
          switchWith((rarity: string) => collectionApiService.getCardsByRarity$(rarity)),
          tapResponse(
            ([rarity, cards]: [string, Card[]]) => {
              const newRarityMap = cards.reduce((memo: Map<string, Card>, card: Card) => {
                memo.set(card.id, card);
                return memo;
              }, new Map());
              patchState(store, state => {
                const newCardsMap = { ...state.cardsMap, [rarity]: newRarityMap };

                return { cardsMap: newCardsMap };
              });
            },
            (error: HttpErrorResponse) => {
              const errorMessage = error.error.message;

              patchState(store, { error: errorMessage });
            },
          ),
        ),
      ),
      // update() {

      // }
    };
  }),
);
