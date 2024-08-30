import { HttpErrorResponse } from '@angular/common/http';
import { CollectionInfoDto } from '@features/collection/collection.models';
import { CollectionApiService } from '@features/collection/services/collection-api.service';
import * as ngrxSignalsImport from '@ngrx/signals';
import { runFnInContext } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';

import { CollectionInfoStore } from './collection-info.store';

jest.mock('@ngrx/signals', () => {
  const actual = jest.requireActual('@ngrx/signals');

  return {
    ...actual,
    patchState: jest.fn(),
  };
});

describe('CollectionInfoStore', () => {
  let store: any;
  let collectionApiServiceMock: MockProxy<CollectionApiService>;

  beforeEach(() => {
    collectionApiServiceMock = mock<CollectionApiService>();

    collectionApiServiceMock.getCollectionInfo$.mockReturnValue(of({ cards_collected: 1 } as CollectionInfoDto));

    const providers = [
      {
        provide: CollectionApiService,
        useValue: collectionApiServiceMock,
      },
    ];

    store = runFnInContext(providers, () => new CollectionInfoStore());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getCollectionInfo', () => {
    it('should reset store metadata before API call', () => {
      const spy = jest.spyOn(ngrxSignalsImport, 'patchState');

      store.getCollectionInfo();

      expect(spy).toHaveBeenNthCalledWith(1, expect.anything(), { error: undefined, loading: true });
    });

    it('should trigger "getCollectionInfo$" method of api service', () => {
      store.getCollectionInfo();

      expect(collectionApiServiceMock.getCollectionInfo$).toHaveBeenCalledTimes(1);
    });

    it('should set loading to false after API call finished and save received data', () => {
      const spy = jest.spyOn(ngrxSignalsImport, 'patchState');

      store.getCollectionInfo();

      expect(spy).toHaveBeenNthCalledWith(2, expect.anything(), { cards_collected: 1, loading: false });
    });

    it('should save error message to store and set loading to false if error received during API call', () => {
      const spy = jest.spyOn(ngrxSignalsImport, 'patchState');
      collectionApiServiceMock.getCollectionInfo$.mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: { message: 'errorMessage' } })),
      );

      store.getCollectionInfo();

      expect(spy).toHaveBeenNthCalledWith(2, expect.anything(), { error: 'errorMessage', loading: false });
    });
  });

  describe('updateCardsCollected', () => {
    it('should update store with passed data', () => {
      const spy = jest.spyOn(ngrxSignalsImport, 'patchState');

      store.updateCardsCollected({ cards_collected: 3 });

      expect(spy).toHaveBeenCalledWith(expect.anything(), { cards_collected: 3 });
    });
  });
});
