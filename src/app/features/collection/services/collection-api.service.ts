import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthConstants } from '@features/auth/auth.constants';
import {
  CollectionCardsResponseDto,
  CollectionInfoDto,
  CollectionInfoResponseDto,
  CollectionUpdateResponseDto,
  UpdateCardsDto,
  UpdateCardsResponseData,
} from '@features/collection/collection.models';
import { CollectionSchemas } from '@features/collection/collection.schemas';
import { Card } from '@models/cards.models';
import { ValidationService } from '@services/validation/validation.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly validationService = inject(ValidationService);

  getCollectionInfo$(): Observable<CollectionInfoDto> {
    const context = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

    return this.httpClient
      .get<CollectionInfoResponseDto>(environment.endpoints.collection.getCollectionInfo, { context })
      .pipe(
        map((res: CollectionInfoResponseDto) =>
          this.validationService.validate(CollectionSchemas.collectionInfoResponseDto, res),
        ),
        map((res: CollectionInfoResponseDto) => res.data),
      );
  }

  getCardsByRarity$(rarity: string): Observable<Card[]> {
    const context = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);
    const params = new HttpParams().set('rarity', rarity);

    return this.httpClient
      .get<CollectionCardsResponseDto>(environment.endpoints.collection.getByRarity, {
        context,
        params,
      })
      .pipe(
        map((res: CollectionCardsResponseDto) =>
          this.validationService.validate(CollectionSchemas.collectionCardsResponseDto, res),
        ),
        map((res: CollectionCardsResponseDto) => res.data.cards),
      );
  }

  getCardsBySearchTerm$(searchTerm: string): Observable<Card[]> {
    const context = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);
    const params = new HttpParams().set('term', searchTerm);

    return this.httpClient
      .get<CollectionCardsResponseDto>(environment.endpoints.collection.search, { context, params })
      .pipe(
        map((res: CollectionCardsResponseDto) =>
          this.validationService.validate(CollectionSchemas.collectionCardsResponseDto, res),
        ),
        map((res: CollectionCardsResponseDto) => res.data.cards),
      );
  }

  updateCards$(cards: UpdateCardsDto): Observable<UpdateCardsResponseData> {
    const context = new HttpContext().set(AuthConstants.skipLoadingContextToken, true);

    return this.httpClient
      .post<CollectionUpdateResponseDto>(environment.endpoints.collection.update, { cards }, { context })
      .pipe(
        map((res: CollectionUpdateResponseDto) =>
          this.validationService.validate(CollectionSchemas.collectionUpdateResponseDto, res),
        ),
        map((res: CollectionUpdateResponseDto) => res.data),
      );
  }
}
