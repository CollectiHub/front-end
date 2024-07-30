import { FormControl } from '@angular/forms';
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

    component.searchControl = {
      reset: () => {},
      get valueChanges() {
        return of(undefined);
      },
    } as FormControl;
  });

  describe('ngOnInit', () => {
    describe('search term is valid', () => {
      it('should trigger "getCardsBySearchTerm$" of collectionApiService', () => {
        const spy = jest.spyOn(collectionApiServiceMock, 'getCardsBySearchTerm$');

        jest.spyOn(component.searchControl, 'valueChanges', 'get').mockReturnValue(of('RR'));

        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
      });

      it('should set isLoadingCards to true when a search request is sent', () => {
        const spy = jest.spyOn(component.isLoadingCards, 'set');

        jest.spyOn(component.searchControl, 'valueChanges', 'get').mockReturnValue(of('RR'));

        component.ngOnInit();

        expect(spy).toHaveBeenNthCalledWith(1, true);
      });

      it('should set isLoadingCards to false after receiving a response', () => {
        const spy = jest.spyOn(component.isLoadingCards, 'set');

        jest.spyOn(component.searchControl, 'valueChanges', 'get').mockReturnValue(of('RR'));

        component.ngOnInit();

        expect(spy).toHaveBeenLastCalledWith(false);
      });

      it('should set isLoadingCards to false after receiving a error response', () => {
        const spy = jest.spyOn(component.isLoadingCards, 'set');
        const spySearchList = jest.spyOn(component.searchCardsList, 'set');

        jest.spyOn(collectionApiServiceMock, 'getCardsBySearchTerm$').mockRejectedValueOnce(new Error() as never);
        jest.spyOn(component.searchControl, 'valueChanges', 'get').mockReturnValue(of('RR'));

        component.ngOnInit();

        expect(spySearchList).not.toHaveBeenCalled();
        expect(spy).toHaveBeenLastCalledWith(false);
      });

      it('should set searchCardsList with cards', () => {
        const mockCards = [{} as Card];
        const spy = jest.spyOn(component.searchCardsList, 'set');

        collectionApiServiceMock.getCardsBySearchTerm$.mockReturnValue(of(mockCards));
        jest.spyOn(component.searchControl, 'valueChanges', 'get').mockReturnValue(of('RR'));

        component.ngOnInit();

        expect(spy).toHaveBeenCalledWith(mockCards);
      });
    });

    describe('search term is empty', () => {
      it('should does not trigger "getCardsBySearchTerm$" of collectionApiService', () => {
        const spy = jest.spyOn(collectionApiServiceMock, 'getCardsBySearchTerm$');

        jest.spyOn(component.searchControl, 'valueChanges', 'get').mockReturnValue(of(''));

        component.ngOnInit();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should set searchCardsList with null', () => {
        const spy = jest.spyOn(component.searchCardsList, 'set');

        jest.spyOn(component.searchControl, 'valueChanges', 'get').mockReturnValue(of(''));

        component.ngOnInit();

        expect(spy).toHaveBeenCalledWith(null);
      });
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

    it('should trigger "reset" of searchControl if searchCardsList is not null', () => {
      const spy = jest.spyOn(component.searchControl, 'reset');
      component.searchCardsList.set(mock<Card[]>());

      component.handleSelectRarity('SSR');

      expect(spy).toHaveBeenCalled();
    });
  });
});
