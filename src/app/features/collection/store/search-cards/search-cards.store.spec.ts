import { HttpErrorResponse } from '@angular/common/http';
import { CollectionApiService } from '@features/collection/services/collection-api.service';
import { Card, CardStatus } from '@models/cards.models';
import * as ngrxSignalsImport from '@ngrx/signals';
import * as entitiesImport from '@ngrx/signals/entities';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import { SearchCardsStore } from './search-cards.store';

jest.mock('@ngrx/signals', () => {
  const actual = jest.requireActual('@ngrx/signals');

  return {
    ...actual,
    patchState: jest.fn(),
  };
});

jest.mock('@ngrx/signals/entities', () => {
  const actual = jest.requireActual('@ngrx/signals/entities');

  return {
    ...actual,
    updateEntities: jest.fn(),
    setEntities: jest.fn(),
    removeAllEntities: jest.fn(),
  };
});

describe('SearchCardsStore', () => {
  let store: any;
  let collectionApiServiceMock: MockProxy<CollectionApiService>;
  const cardsMock = [{ id: '123', status: CardStatus.Collected } as Card];

  beforeEach(() => {
    collectionApiServiceMock = mock<CollectionApiService>();

    collectionApiServiceMock.getCardsBySearchTerm$.mockReturnValue(of(cardsMock));

    const providers = [
      {
        provide: CollectionApiService,
        useValue: collectionApiServiceMock,
      },
    ];

    store = runFnInContext(providers, () => new SearchCardsStore());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('search', () => {
    it('should reset store metadata before API call', () => {
      const spy = jest.spyOn(ngrxSignalsImport, 'patchState');

      store.search('searchTerm');

      expect(spy).toHaveBeenNthCalledWith(1, expect.anything(), { error: undefined, loading: true });
    });

    it('should trigger "getCardsBySearchTerm$" method of api service', () => {
      store.search('searchTerm');

      expect(collectionApiServiceMock.getCardsBySearchTerm$).toHaveBeenCalledWith('searchTerm');
    });

    it('should save entities to store if received from API', () => {
      const spy = jest.spyOn(entitiesImport, 'setEntities');

      store.search('searchTerm');

      expect(spy).toHaveBeenCalledWith(cardsMock);
    });

    it('should set loading to false after API call finished', () => {
      const spy = jest.spyOn(ngrxSignalsImport, 'patchState');

      store.search('searchTerm');

      expect(spy).toHaveBeenNthCalledWith(2, expect.anything(), undefined, { loading: false });
    });

    it('should save error message to store and set loading to false if error received during API call', () => {
      const spy = jest.spyOn(ngrxSignalsImport, 'patchState');
      collectionApiServiceMock.getCardsBySearchTerm$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'errorMessage' } })),
      );

      store.search('searchTerm');

      expect(spy).toHaveBeenNthCalledWith(2, expect.anything(), { error: 'errorMessage', loading: false });
    });
  });

  describe('clearSearchCards', () => {
    it('should trigger "removeAllEntities" method', () => {
      const spy = jest.spyOn(entitiesImport, 'removeAllEntities');

      store.clearSearchCards();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should trigger "updateEntities" method', () => {
      const spy = jest.spyOn(entitiesImport, 'updateEntities');
      const patch = {
        ids: ['123'],
        changes: { status: CardStatus.NotCollected },
      };

      store.update(patch);

      expect(spy).toHaveBeenCalledWith(patch);
    });
  });
});
