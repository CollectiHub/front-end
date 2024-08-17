import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Card } from '@models/collection.models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { removeAllEntities, setEntities, updateEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { CollectionApiService } from '../../services/collection-api.service';
import { UpdateCardEntityPatch } from '../collection-cards-store/collection-cards.store.models';

import { SEARCH_CARDS_INITIAL_STATE } from './search-cards.state';

export const SearchCardsStore = signalStore(
  { providedIn: 'root' },
  withState(SEARCH_CARDS_INITIAL_STATE),
  withEntities<Card>(),
  withMethods(store => {
    const collectionApiService = inject(CollectionApiService);

    return {
      search: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { error: undefined, loading: true })),
          switchMap((searchTerm: string) => collectionApiService.getCardsBySearchTerm$(searchTerm)),
          tapResponse(
            (cards: Card[]) => patchState(store, setEntities(cards), { loading: false }),
            (error: HttpErrorResponse) => {
              const errorMessage = error.error.message;

              patchState(store, { error: errorMessage, loading: false });
            },
          ),
        ),
      ),
      clearSearchCards(): void {
        patchState(store, removeAllEntities());
      },
      update(patch: UpdateCardEntityPatch): void {
        patchState(store, updateEntities(patch));
      },
    };
  }),
);
