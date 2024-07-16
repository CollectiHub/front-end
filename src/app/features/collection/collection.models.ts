import { Card } from '@models/collection.models';

export interface CollectionInfoResponseDto {
  data: CollectionInfoDto;
  message: string;
}

export interface CollectionInfoDto {
  rarities: string[];
  cards_total: number;
  cards_collected: number;
}

export interface CollectionCardsResponseDto {
  data: {
    cards: Card[];
  };
  message: string;
}

export interface CollectionUpdateResponseDto {
  data: {
    cards_collected: number;
  };
  message: string;
}
