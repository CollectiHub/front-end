import { HttpClient, HttpContext } from '@angular/common/http';
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
    httpClientMock.post.mockReturnValue(of(responseMock));
    httpClientMock.get.mockReturnValue(of(responseMock));
    httpClientMock.delete.mockReturnValue(of(responseMock));
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

    it('should return the data from the response', done => {
      service
        .getCollectionInfo$()
        .pipe(take(1))
        .subscribe(res => {
          expect(res).toBe(responseMock.data);

          done();
        });
    });
  });

  describe('getCardsByRarity$', () => {
    it('should trigger "get" method with the correct args', () => {
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);
      const rarity = 'SSR';

      service.getCardsByRarity$(rarity).pipe(take(1)).subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith(
        `${environment.endpoints.collection.getByRarity}?rarity=${rarity}`,
        { context: contextMock },
      );
    });

    it('should validate the response', () => {
      service.getCardsByRarity$('R').pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        CollectionSchemas.collectionCardsResponseDto,
        responseMock,
      );
    });

    it('should return the cards from the response', done => {
      const cardsMock = [{}];
      const resnonseWithCardsMock = { data: { cards: cardsMock } };

      validationServiceMock.validate.mockReturnValueOnce(resnonseWithCardsMock);

      service
        .getCardsByRarity$('R')
        .pipe(take(1))
        .subscribe(res => {
          expect(res).toBe(cardsMock);

          done();
        });
    });
  });

  describe('getCardsBySearchTerm$', () => {
    it('should trigger "get" method with the correct args', () => {
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);
      const searchTerm = 'Sasuke';

      service.getCardsBySearchTerm$(searchTerm).pipe(take(1)).subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith(`${environment.endpoints.collection.search}?term=${searchTerm}`, {
        context: contextMock,
      });
    });

    it('should validate the response', () => {
      service.getCardsBySearchTerm$('SR').pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        CollectionSchemas.collectionCardsResponseDto,
        responseMock,
      );
    });

    it('should return the cards from the response', done => {
      const cardsMock = [{}];
      const resnonseWithCardsMock = { data: { cards: cardsMock } };

      validationServiceMock.validate.mockReturnValueOnce(resnonseWithCardsMock);

      service
        .getCardsBySearchTerm$('R')
        .pipe(take(1))
        .subscribe(res => {
          expect(res).toBe(cardsMock);

          done();
        });
    });
  });

  describe('updateCollection$', () => {
    it('should trigger "patch" method with the correct args', () => {
      const updateCardsMock = [{} as UpdateCardDto];
      const contextMock = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

      service.updateCollection$(updateCardsMock).pipe(take(1)).subscribe();

      expect(httpClientMock.patch).toHaveBeenCalledWith(
        environment.endpoints.collection.update,
        { cards: updateCardsMock },
        { context: contextMock },
      );
    });

    it('should validate the response', () => {
      const updateCardsMock = [{} as UpdateCardDto];

      service.updateCollection$(updateCardsMock).pipe(take(1)).subscribe();

      expect(validationServiceMock.validate).toHaveBeenCalledWith(
        CollectionSchemas.collectionUpdateResponseDto,
        responseMock,
      );
    });

    it('should return the number of cards collected from the response', done => {
      const updateCardsMock = [{} as UpdateCardDto];
      const amountCollectedCards = 120;
      const resnonseUpdateMock = { data: { cards_collected: amountCollectedCards } };

      validationServiceMock.validate.mockReturnValueOnce(resnonseUpdateMock);

      service
        .updateCollection$(updateCardsMock)
        .pipe(take(1))
        .subscribe(res => {
          expect(res).toBe(amountCollectedCards);

          done();
        });
    });
  });
});
