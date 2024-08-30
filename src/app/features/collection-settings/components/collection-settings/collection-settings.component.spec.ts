import { CardsDisplayMode, CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
import { CollectionSettingsStore } from '@features/collection-settings/store/collection-settings.store';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import { CollectionSettingsStoreMock } from '../../store/collection-settings.store.testing';

import { CollectionSettingsComponent } from './collection-settings.component';

describe(CollectionSettingsComponent.name, () => {
  let component: CollectionSettingsComponent;
  let collectionSettingsStoreMock: MockProxy<CollectionSettingsStoreMock>;

  beforeEach(() => {
    collectionSettingsStoreMock = mock<CollectionSettingsStoreMock>();

    component = classWithProviders({
      token: CollectionSettingsComponent,
      providers: [
        {
          provide: CollectionSettingsStore,
          useValue: collectionSettingsStoreMock,
        },
      ],
    });
  });

  describe('handleGlobalProgressModeChange', () => {
    it('should not trigger "updateSettings" if passed value is the same as we have in storage', () => {
      collectionSettingsStoreMock.globalProgressDisplayMode.mockReturnValue(CollectionProgressMode.None);

      component.handleGlobalProgressModeChange(CollectionProgressMode.None);

      expect(collectionSettingsStoreMock.updateSettings).not.toHaveBeenCalled();
    });

    it('should trigger "updateSettings" if passd value is not the same as we have in storage', () => {
      collectionSettingsStoreMock.globalProgressDisplayMode.mockReturnValue(CollectionProgressMode.Numbers);

      component.handleGlobalProgressModeChange(CollectionProgressMode.None);

      expect(collectionSettingsStoreMock.updateSettings).toHaveBeenCalledWith({
        globalProgressDisplayMode: CollectionProgressMode.None,
      });
    });
  });

  describe('handleRarityProgressModeChange', () => {
    it('should not trigger "updateSettings" if passed value is the same as we have in storage', () => {
      collectionSettingsStoreMock.rarityProgressDisplayMode.mockReturnValue(CollectionProgressMode.None);

      component.handleRarityProgressModeChange(CollectionProgressMode.None);

      expect(collectionSettingsStoreMock.updateSettings).not.toHaveBeenCalled();
    });

    it('should trigger "updateSettings" if passd value is not the same as we have in storage', () => {
      collectionSettingsStoreMock.rarityProgressDisplayMode.mockReturnValue(CollectionProgressMode.Numbers);

      component.handleRarityProgressModeChange(CollectionProgressMode.None);

      expect(collectionSettingsStoreMock.updateSettings).toHaveBeenCalledWith({
        rarityProgressDisplayMode: CollectionProgressMode.None,
      });
    });
  });

  describe('handleCardsViewModeChange', () => {
    it('should not trigger "updateSettings" if passed value is the same as we have in storage', () => {
      collectionSettingsStoreMock.cardsDisplayMode.mockReturnValue(CardsDisplayMode.Image);

      component.handleCardsViewModeChange(CardsDisplayMode.Image);

      expect(collectionSettingsStoreMock.updateSettings).not.toHaveBeenCalled();
    });

    it('should trigger "updateSettings" if passd value is not the same as we have in storage', () => {
      collectionSettingsStoreMock.rarityProgressDisplayMode.mockReturnValue(CardsDisplayMode.Image);

      component.handleCardsViewModeChange(CardsDisplayMode.Chip);

      expect(collectionSettingsStoreMock.updateSettings).toHaveBeenCalledWith({
        cardsDisplayMode: CardsDisplayMode.Chip,
      });
    });
  });
});
