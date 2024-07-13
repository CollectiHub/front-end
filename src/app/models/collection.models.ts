export interface Card {
  id: string;
  rarity: string;
  status: StatusCard;
  character_name: string;
  serial_number: string;
  image_url: string;
}

export interface UpdateCardDto {
  id: string;
  status: StatusCard;
}

export enum StatusCard {
  Collected = 'collected',
  NotCollected = 'not_collected',
  NotExisting = 'not_existing',
}
