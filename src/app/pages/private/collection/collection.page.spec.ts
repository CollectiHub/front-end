import { CollectionSettingsStoreMock } from '@features/collection-settings/store/collection-settings.state.testing';
import { CollectionSettingsStore } from '@features/collection-settings/store/collection-settings.store';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import CollectionPage from './collection.page';

describe(CollectionPage.name, () => {
  let component: CollectionPage;
  let collectionSettingsStoreMock: MockProxy<CollectionSettingsStoreMock>;

  beforeEach(() => {
    collectionSettingsStoreMock = mock<CollectionSettingsStoreMock>();
    collectionSettingsStoreMock.selectedRarity.mockReturnValue('R');

    component = classWithProviders({
      token: CollectionPage,
      providers: [
        {
          provide: CollectionSettingsStore,
          useValue: collectionSettingsStoreMock,
        },
      ],
    });
  });

  describe('handleSelectRarity', () => {
    it('should not trigger "updateSettings" if passed value is the same as we have in store', () => {
      component.handleSelectRarity('R');

      expect(collectionSettingsStoreMock.updateSettings).not.toHaveBeenCalled();
    });

    it('should trigger "updateSettings" if passed value is not the same as we have in store', () => {
      component.handleSelectRarity('SSR');

      expect(collectionSettingsStoreMock.updateSettings).toHaveBeenCalledWith({ selectedRarity: 'SSR' });
    });
  });
});
