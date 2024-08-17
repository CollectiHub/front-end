import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AuthConstants } from '@features/auth/auth.constants';
import { CollectionSchemas } from '@features/collection/collection.schemas';
import { UpdateCardDto } from '@models/collection.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ValidationService } from '@services/validation/validation.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';

import { CollectionApiService } from './collection-api.service';

describe(CollectionApiService.name, () => {
  let service: CollectionApiService;
  let httpClientMock: MockProxy<HttpClient>;
  let validationServiceMock: MockProxy<ValidationService>;

  const responseMock = { data: {}, message: 'message' };

  beforeEach(() => {
    httpClientMock = mock<HttpClient>();
    httpClientMock.get.mockReturnValue(of(responseMock));
    httpClientMock.patch.mockReturnValue(of(responseMock));

    validationServiceMock = mock<ValidationService>();
    validationServiceMock.validate.mockReturnValue(responseMock);

    service = classWithProviders({
      token: CollectionApiService,
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
        {
          provide: ValidationService,
          useValue: validationServiceMock,
        },
      ],
    });
  });

  describe('getCollectionInfo$', () => {
    it('should trigger "get" method with the correct args', () => {
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

      service.getCollectionInfo$().pipe(take(1)).subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith(environment.endpoints.collection.getCollectionInfo, {
        context: contextMock,
      });
    });

    it('should validate the response', () => {
      service.getCollectionInfo$().pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        CollectionSchemas.collectionInfoResponseDto,
        responseMock,
      );
    });

    it('should return the data from the response', () => {
      const spy = jest.fn();

      service.getCollectionInfo$().pipe(take(1)).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(responseMock.data);
    });
  });

  describe('getCardsByRarity$', () => {
    it('should trigger "get" method with the correct args', () => {
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);
      const rarity = 'SSR';
      const paramsMock = new HttpParams().set('rarity', rarity);

      service.getCardsByRarity$(rarity).pipe(take(1)).subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith(environment.endpoints.collection.getByRarity, {
        context: contextMock,
        params: paramsMock,
      });
    });

    it('should validate the response', () => {
      service.getCardsByRarity$('R').pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        CollectionSchemas.collectionCardsResponseDto,
        responseMock,
      );
    });

    it('should return the cards from the response', () => {
      const spy = jest.fn();
      const cardsMock = mock();
      const resnonseWithCardsMock = { data: { cards: cardsMock } };

      validationServiceMock.validate.mockReturnValueOnce(resnonseWithCardsMock);

      service.getCardsByRarity$('S').pipe(take(1)).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(cardsMock);
    });
  });

  describe('getCardsBySearchTerm$', () => {
    it('should trigger "get" method with the correct args', () => {
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);
      const searchTerm = 'Sasuke';
      const paramsMock = new HttpParams().set('term', searchTerm);

      service.getCardsBySearchTerm$(searchTerm).pipe(take(1)).subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith(environment.endpoints.collection.search, {
        context: contextMock,
        params: paramsMock,
      });
    });

    it('should validate the response', () => {
      service.getCardsBySearchTerm$('SR').pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        CollectionSchemas.collectionCardsResponseDto,
        responseMock,
      );
    });

    it('should return the cards from the response', () => {
      const spy = jest.fn();
      const cardsMock = mock();
      const resnonseWithCardsMock = { data: { cards: cardsMock } };

      validationServiceMock.validate.mockReturnValueOnce(resnonseWithCardsMock);

      service.getCardsBySearchTerm$('Sasuke').pipe(take(1)).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(cardsMock);
    });
  });

  describe('updateCollection$', () => {
    it('should trigger "patch" method with the correct args', () => {
      const updateCardsMock = mock<UpdateCardDto>();
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

      service.updateCards$(updateCardsMock).pipe(take(1)).subscribe();

      expect(httpClientMock.patch).toHaveBeenCalledWith(
        environment.endpoints.collection.update,
        { cards: updateCardsMock },
        { context: contextMock },
      );
    });

    it('should validate the response', () => {
      const updateCardsMock = mock<UpdateCardDto>();

      service.updateCards$(updateCardsMock).pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        CollectionSchemas.collectionUpdateResponseDto,
        responseMock,
      );
    });

    it('should return the number of cards collected from the response', () => {
      const spy = jest.fn();
      const amountCollectedCards = 120;
      const updateCardsMock = mock<UpdateCardDto>();
      const resnonseUpdateMock = { data: { cards_collected: amountCollectedCards } };

      validationServiceMock.validate.mockReturnValueOnce(resnonseUpdateMock);

      service.updateCards$(updateCardsMock).pipe(take(1)).subscribe(spy);

      expect(spy).toHaveBeenCalledWith(amountCollectedCards);
    });
  });
});
