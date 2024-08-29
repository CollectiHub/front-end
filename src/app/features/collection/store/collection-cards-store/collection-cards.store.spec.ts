import { HttpErrorResponse } from '@angular/common/http';
import { CollectionApiService } from '@features/collection/services/collection-api.service';
import * as ngrxSignalsImport from '@ngrx/signals';
import * as entitiesImport from '@ngrx/signals/entities';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import { CollectionInfoStore } from '../collection-info/collection-info.store';
import { CollectionInfoStoreMock } from '../collection-info/collection-info.store.testing';
import { SearchCardsStore } from '../search-cards/search-cards.store';
import { SearchCardsStoreMock } from '../search-cards/search-cards.store.testing';

import { CollectionCardsStore } from './collection-cards.store';
import { CollectionCardsStoreFunctions } from './collection-cards.store.functions';
import { Card, CardStatus } from '@models/cards.models';
import { fakeAsync, tick } from '@angular/core/testing';

jest.mock('@ngrx/signals/entities', () => {
  const actual = jest.requireActual('@ngrx/signals/entities');

  return {
    ...actual,
    updateEntities: jest.fn(),
  };
});

describe('CollectionCardsStore', () => {
  let store: any;
  let collectionApiServiceMock: MockProxy<CollectionApiService>;
  let collectionStoreStoreMock: MockProxy<CollectionInfoStoreMock>;
  let searchCardsStoreMock: MockProxy<SearchCardsStoreMock>;

  const cardsMock = [{ id: '123', status: CardStatus.Collected } as Card];
  const updatePatchMock = { ids: ['1'], changes: {} };

  let buildCardsLoadingMapSpy: jest.SpyInstance;

  beforeEach(() => {
    collectionApiServiceMock = mock<CollectionApiService>();
    collectionApiServiceMock.updateCards$.mockReturnValue(of({ cards_collected: 3 }));
    collectionApiServiceMock.getCardsByRarity$.mockReturnValue(of(cardsMock));

    collectionStoreStoreMock = mock<CollectionInfoStoreMock>();
    searchCardsStoreMock = mock<SearchCardsStoreMock>();

    buildCardsLoadingMapSpy = jest.spyOn(CollectionCardsStoreFunctions, 'buildCardsLoadingMap').mockReturnValue({});

    const providers = [
      {
        provide: CollectionApiService,
        useValue: collectionApiServiceMock,
      },
      {
        provide: CollectionInfoStore,
        useValue: collectionStoreStoreMock,
      },
      {
        provide: SearchCardsStore,
        useValue: searchCardsStoreMock,
      },
    ];

    store = runFnInContext(providers, () => new CollectionCardsStore());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchByRarity', () => {
    // it('should reset store metadata before API call', fakeAsync(() => {
    //   const spy = jest.spyOn(ngrxSignalsImport, 'patchState');

    //   store.fetchByRarity('R');
    //   tick();

    //   expect(spy).toHaveBeenNthCalledWith(1, expect.anything(), { error: undefined, loading: true });
    // }));

    it('should trigger "getCardsByRarity$" method of api service', fakeAsync(() => {
      store.fetchByRarity('R');
      tick();

      expect(collectionApiServiceMock.getCardsByRarity$).toHaveBeenCalledWith('R');
    }));

    it('should save entities to store if received from API', fakeAsync(() => {
      const spy = jest.spyOn(entitiesImport, 'setEntities');

      store.fetchByRarity('R');
      tick();

      expect(spy).toHaveBeenCalledWith(cardsMock);
    }));

    // it('should set loading to false after API call finished', fakeAsync(() => {
    //   const spy = jest.spyOn(ngrxSignalsImport, 'patchState');

    //   store.fetchByRarity('R');
    //   tick();

    //   expect(spy).toHaveBeenNthCalledWith(2, expect.anything(), undefined, { loading: false });
    // }));

    // it('should save error message to store and set loading to false if error received during API call', fakeAsync(() => {
    //   const spy = jest.spyOn(ngrxSignalsImport, 'patchState');
    //   collectionApiServiceMock.getCardsByRarity$.mockReturnValue(
    //     throwError(() => new HttpErrorResponse({ error: { message: 'errorMessage' } })),
    //   );

    //   store.fetchByRarity('R');
    //   tick();

    //   expect(spy).toHaveBeenNthCalledWith(2, expect.anything(), { error: 'errorMessage', loading: false });
    // }));
  });

  describe('update', () => {
    describe('loading map', () => {
      it('should build  loading map before sending API call', () => {
        const spy = jest.spyOn(CollectionCardsStoreFunctions, 'buildCardsLoadingMap').mockReturnValue({});

        store.update(updatePatchMock);

        expect(spy).toHaveBeenNthCalledWith(1, ['1'], {}, false);
      });

      // it('should update loading map in store before sending API call', () => {
      //   const spy = jest.spyOn(ngrxSignalsImport, 'patchState');
      //   jest.spyOn(CollectionCardsStoreFunctions, 'buildCardsLoadingMap').mockReturnValue({});

      //   store.update(updatePatchMock);

      //   expect(spy).toHaveBeenNthCalledWith(1, { cardsLoadingMap: {} });
      // });
    });

    describe('API request', () => {
      it('should trigger "updateCards$" API method with passed payload', () => {
        store.update(updatePatchMock);

        expect(collectionApiServiceMock.updateCards$).toHaveBeenCalledWith(updatePatchMock);
      });
    });

    describe('succesful API request', () => {
      it('should trigger "update" method of search cards store', () => {
        store.update(updatePatchMock);

        expect(searchCardsStoreMock.update).toHaveBeenCalledWith(updatePatchMock);
      });

      it('should trigger "updateCardsCollected" method of collection info store', () => {
        store.update(updatePatchMock);

        expect(collectionStoreStoreMock.updateCardsCollected).toHaveBeenCalledWith({ cards_collected: 3 });
      });

      it('should update trigger "updateEntities"', () => {
        const spy = jest.spyOn(entitiesImport, 'updateEntities');

        store.update(updatePatchMock);

        expect(spy).toHaveBeenCalledWith(updatePatchMock);
      });

      it('should build loading map after successful request', () => {
        const spy = jest.spyOn(CollectionCardsStoreFunctions, 'buildCardsLoadingMap');

        store.update(updatePatchMock);

        expect(spy).toHaveBeenNthCalledWith(2, ['1'], {}, false);
      });

      // it('should update loading data in store', () => {
      //   const spy = jest.spyOn(ngrxSignalsImport, 'patchState');
      //   jest.spyOn(CollectionCardsStoreFunctions, 'buildCardsLoadingMap').mockReturnValue({});

      //   store.update(updatePatchMock);

      //   expect(spy).toHaveBeenNthCalledWith(2, expect.anything(), undefined, { cardsLoadingMap: {} });
      // });
    });

    describe('error case', () => {
      beforeEach(() => {
        collectionApiServiceMock.updateCards$.mockReturnValue(
          throwError(() => new HttpErrorResponse({ error: { message: 'errorMessage' } })),
        );
      });

      it('should build loading map in case of error', () => {
        store.update(updatePatchMock);

        expect(buildCardsLoadingMapSpy).toHaveBeenNthCalledWith(2, ['1'], {}, false);
      });

      it('should save error to store', () => {
        store.update(updatePatchMock);

        expect(store.error()).toBe('errorMessage');
      });

      it('should save loading map to store', () => {
        buildCardsLoadingMapSpy.mockReturnValue({ '1': true });
        
        store.update(updatePatchMock);

        expect(store.cardsLoadingMap()).toStrictEqual({ '1': true });
      });
    });
  });
});
