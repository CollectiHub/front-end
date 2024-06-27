import { inject } from '@angular/core';
import { getState, patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { StorageService } from '@services/storage/storage.service';
import { filter, pipe, switchMap, take, tap } from 'rxjs';

import { COLLECTION_SETTINGS_INITIAL_STATE } from './collection-settings.state';
import { COLLECTION_SETTINGS_STORAGE_KEY } from './collection-settings.state.constants';
import { CollectionSettingsState } from './collection-settings.store.models';

export const CollectionSettingsStore = signalStore(
  { providedIn: 'root' },
  withState(COLLECTION_SETTINGS_INITIAL_STATE),
  withMethods(store => {
    const storageService = inject(StorageService);

    return {
      updateSettings: rxMethod<Partial<CollectionSettingsState>>(
        pipe(
          tap((patch: Partial<CollectionSettingsState>) => patchState(store, patch)),
          switchMap(patch => storageService.set$(COLLECTION_SETTINGS_STORAGE_KEY, { ...getState(store), ...patch })),
        ),
      ),
    };
  }),

  withHooks({
    onInit(store) {
      inject(StorageService)
        .get$<CollectionSettingsState>(COLLECTION_SETTINGS_STORAGE_KEY)
        .pipe(take(1), filter(Boolean))
        .subscribe((restoredState: CollectionSettingsState) => patchState(store, restoredState));
    },
  }),
);
