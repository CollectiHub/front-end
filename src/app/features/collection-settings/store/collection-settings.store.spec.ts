import { Provider } from '@angular/core';
import { getState } from '@ngrx/signals';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { Subject, of } from 'rxjs';

import { CardsDisplayMode } from '../collection-settings.models';

import { COLLECTION_SETTINGS_INITIAL_STATE } from './collection-settings.state';
import { COLLECTION_SETTINGS_STORAGE_KEY } from './collection-settings.state.constants';
import { CollectionSettingsStore } from './collection-settings.store';

describe('CollectionSettingsStore', () => {
  let store: any;
  let storageServiceMock: MockProxy<StorageService>;
  const getFromStorage$ = new Subject<any>();

  let providers: Provider[];

  beforeEach(() => {
    storageServiceMock = mock<StorageService>();
    storageServiceMock.get$.mockReturnValue(getFromStorage$);
    storageServiceMock.set$.mockReturnValue(of(undefined));

    providers = [{ provide: StorageService, useValue: storageServiceMock }];

    store = runFnInContext(providers, () => new CollectionSettingsStore());
  });

  describe('updateSettings', () => {
    beforeEach(() => {
      getFromStorage$.next(undefined);
    });

    it('should apply settings update patch to store', () => {
      store.updateSettings({ cardsDisplayMode: CardsDisplayMode.Image });

      expect(store.cardsDisplayMode()).toBe(CardsDisplayMode.Image);
    });

    it('should save settings to storage when updated', () => {
      const expectedSettings = {
        ...COLLECTION_SETTINGS_INITIAL_STATE,
        cardsDisplayMode: CardsDisplayMode.Image,
      };

      store.updateSettings({ cardsDisplayMode: CardsDisplayMode.Image });

      expect(storageServiceMock.set$).toHaveBeenCalledWith(COLLECTION_SETTINGS_STORAGE_KEY, expectedSettings);
    });
  });

  describe('onInit', () => {
    it('should try to get settings from storage', () => {
      getFromStorage$.next(undefined);

      expect(storageServiceMock.get$).toHaveBeenCalledWith(COLLECTION_SETTINGS_STORAGE_KEY);
    });

    it('should update settings in store, if they were recovered from store', () => {
      const expectedSettings = {
        ...COLLECTION_SETTINGS_INITIAL_STATE,
        selectedRarity: 'SSR',
      };

      getFromStorage$.next({ selectedRarity: 'SSR' });

      expect(getState(store)).toStrictEqual(expectedSettings);
    });

    it('should not update settings in store, if no settings recovered from store', () => {
      getFromStorage$.next(undefined);

      expect(getState(store)).toStrictEqual(COLLECTION_SETTINGS_INITIAL_STATE);
    });
  });
});
