import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { CollectionInfoDto } from '@features/collection/collection.models';
import { CardStatus, UpdateCardDto } from '@models/collection.models';
import { from, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MockInterceptorRegistryService } from '../mock-interceptor-registry/mock-interceptor-registry.service';

import { CollectionCacheManager } from './collection-cache-manager';
import { CollectionCache } from './collection-cache-manager.models';

export const collectionMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();
  const cacheManager = new CollectionCacheManager();

  registry.get(environment.endpoints.collection.getCollectionInfo, () => {
    const cache = cacheManager.getCacheData();
    const shouldThrowError = false;

    if (shouldThrowError) {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              error: 'Error during fetching collection info',
              errors: [
                {
                  detail: 'Collection error',
                  field: 'Collection info',
                },
              ],
              message: 'Error during fetching collection info',
            },
          }),
      );
    }

    return from(import('./rarities-mock.json')).pipe(
      map(raritiesMock => {
        const collectionInfo: CollectionInfoDto = {
          cards_total: cache.cards_total,
          cards_collected: cache.cards_collected,
          rarities: raritiesMock.rarities,
        };

        return new HttpResponse({ status: 200, body: { data: collectionInfo, message: 'Success!' } });
      }),
    );
  });

  registry.get(environment.endpoints.collection.search, req => {
    const searchTerm = req.params.get('term')?.toLocaleLowerCase() as string;

    if (searchTerm === 'showerror') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              error: 'Error during searching cards',
              errors: [
                {
                  detail: 'Collection error',
                  field: 'Search',
                },
              ],
              message: 'Error during sarching cards. Try again',
            },
          }),
      );
    }

    const cache = cacheManager.getCacheData();
    const targetCards = cache.cards.filter(card => {
      const isMatchCharacterName = card.character_name.toLocaleLowerCase().includes(searchTerm);
      const isMatchNumber = card.serial_number.toLocaleLowerCase().includes(searchTerm);
      const isCardExisting = card.status !== CardStatus.NotExisting;

      return isCardExisting && (isMatchCharacterName || isMatchNumber);
    });

    return of(new HttpResponse({ status: 200, body: { data: { cards: targetCards }, message: 'Success!' } }));
  });

  registry.patch(environment.endpoints.collection.update, req => {
    const requestCards = (req.body as Record<string, []>)['cards'] as UpdateCardDto[];

    const reqCardsMap = requestCards.reduce((memo: Record<string, UpdateCardDto>, card) => {
      memo[card.id] = card;
      return memo;
    }, {});

    if (reqCardsMap['3']) {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              error: 'Error during updating cards',
              errors: [
                {
                  detail: 'Collection error',
                  field: 'Update',
                },
              ],
              message: 'Error during updating cards. Try again',
            },
          }),
      );
    }
    const cache = cacheManager.getCacheData();

    const areCardsCollected = requestCards.some(card => card.status === CardStatus.Collected);
    const updatedCardsCollected = areCardsCollected
      ? cache.cards_collected + requestCards.length
      : cache.cards_collected - requestCards.length;

    const updatedCards = cache.cards.map(card => {
      if (reqCardsMap[card.id]) {
        return { ...card, status: reqCardsMap[card.id].status };
      }

      return card;
    });

    const updatedCache: CollectionCache = {
      ...cache,
      cards: updatedCards,
      cards_collected: updatedCardsCollected,
    };

    cacheManager.put(updatedCache);

    return of(
      new HttpResponse({
        status: 200,
        body: { data: { cards_collected: updatedCardsCollected }, message: 'Success!' },
      }),
    );
  });

  registry.get(environment.endpoints.collection.getByRarity, (_, params) => {
    const targetRarity = params['rarity'];

    if (targetRarity === 'SSR') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              error: 'Error during fetching cards',
              errors: [
                {
                  detail: 'Collection error',
                  field: 'Rarity',
                },
              ],
              message: 'Error during fetching cards. Try again',
            },
          }),
      );
    }

    const cache = cacheManager.getCacheData();

    const targetCards = cache.cards.filter(card => card.rarity === targetRarity);

    return of(new HttpResponse({ status: 200, body: { data: { cards: targetCards }, message: 'Success!' } }));
  });

  return registry.processRequest$(req, next);
};
