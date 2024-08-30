import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { CollectionInfoDto, UpdateCardsResponseData } from '../../collection.models';
import { CollectionApiService } from '../../services/collection-api.service';

import { COLLECTION_INFO_INITIAL_STATE } from './collection-info.state';

export const CollectionInfoStore = signalStore(
  { providedIn: 'root' },
  withState(COLLECTION_INFO_INITIAL_STATE),
  withMethods(store => {
    const collectionApiService = inject(CollectionApiService);

    return {
      getCollectionInfo: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { error: undefined, loading: true })),
          switchMap(() =>
            collectionApiService.getCollectionInfo$().pipe(
              tapResponse({
                next: (collectionInfo: CollectionInfoDto) => patchState(store, { ...collectionInfo, loading: false }),
                error: (error: HttpErrorResponse) => {
                  const errorMessage = error.error.message;

                  patchState(store, { error: errorMessage, loading: false });
                },
              }),
            ),
          ),
        ),
      ),
      updateCardsCollected(updateData: UpdateCardsResponseData): void {
        patchState(store, updateData);
      },
    };
  }),
);
