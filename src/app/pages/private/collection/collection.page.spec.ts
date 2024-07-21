import { signal } from '@angular/core';
import { SearchBarComponent } from '@features/collection/components/search-bar/search-bar.component';
import { CollectionApiService } from '@features/collection/services/collection-api.service';
import { CollectionSettingsStoreMock } from '@features/collection-settings/store/collection-settings.state.testing';
import { CollectionSettingsStore } from '@features/collection-settings/store/collection-settings.store';
import { Card } from '@models/collection.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import CollectionPage from './collection.page';

describe(CollectionPage.name, () => {
  let component: CollectionPage;
  let searchBarComponent: SearchBarComponent;
  let collectionApiServiceMock: MockProxy<CollectionApiService>;
  let collectionSettingsStoreMock: MockProxy<CollectionSettingsStoreMock>;

  beforeEach(() => {
    collectionApiServiceMock = mock<CollectionApiService>();
    collectionApiServiceMock.getCardsBySearchTerm$.mockReturnValue(of([{} as Card]));

    collectionSettingsStoreMock = mock<CollectionSettingsStoreMock>();
    collectionSettingsStoreMock.selectedRarity.mockReturnValue('R');

    component = classWithProviders({
      token: CollectionPage,
      providers: [
        {
          provide: CollectionSettingsStore,
          useValue: collectionSettingsStoreMock,
        },
        {
          provide: CollectionApiService,
          useValue: collectionApiServiceMock,
        },
      ],
    });

    searchBarComponent = classWithProviders({
      token: SearchBarComponent,
      providers: [],
    });

    component.searchBar = signal(searchBarComponent);
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

    it('should trigger "clearInput" of searchbar child if isActiveSearch is true', () => {
      const spy = jest.spyOn(component.searchBar(), 'clearInput');
      component.isSearchActive.set(true);

      component.handleSelectRarity('SSR');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {
    describe('search term is valid', () => {
      it('should set searchList with cards', () => {
        const mockCards = [{} as Card];
        const spy = jest.spyOn(component.searchList, 'set');

        collectionApiServiceMock.getCardsBySearchTerm$.mockReturnValue(of(mockCards));
        jest.spyOn(component.searchBar(), 'searchTerm$').mockReturnValueOnce(of('SR'));

        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(mockCards);
      });

      it('should set isSearchActive to true', () => {
        const spy = jest.spyOn(component.isSearchActive, 'set');

        jest.spyOn(component.searchBar(), 'searchTerm$').mockReturnValueOnce(of('SR'));

        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(true);
      });
    });

    describe('search term is empty', () => {
      it('should set searchList with null', () => {
        const spy = jest.spyOn(component.searchList, 'set');

        jest.spyOn(component.searchBar(), 'searchTerm$').mockReturnValueOnce(of(''));

        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(null);
      });

      it('should set isSearchActive to false', () => {
        const spy = jest.spyOn(component.isSearchActive, 'set');

        jest.spyOn(component.searchBar(), 'searchTerm$').mockReturnValueOnce(of(''));

        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(false);
      });
    });
  });
});
