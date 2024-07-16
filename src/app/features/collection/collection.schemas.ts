import {
  CollectionCardsResponseDto,
  CollectionInfoResponseDto,
  CollectionUpdateResponseDto,
} from '@features/collection/collection.models';
import { CardStatus } from '@models/collection.models';
import { JSONSchemaType } from 'ajv';

export namespace CollectionSchemas {
  export const collectionInfoResponseDto: JSONSchemaType<CollectionInfoResponseDto> = {
    $id: 'CollectionInfoResponseDto',
    type: 'object',
    required: ['data', 'message'],
    properties: {
      data: {
        type: 'object',
        required: ['rarities', 'cards_total', 'cards_collected'],
        properties: {
          rarities: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          cards_total: { type: 'number' },
          cards_collected: { type: 'number' },
        },
      },
      message: { type: 'string' },
    },
  };

  export const collectionCardsResponseDto: JSONSchemaType<CollectionCardsResponseDto> = {
    $id: 'CollectionCardsResponseDto',
    type: 'object',
    required: ['data', 'message'],
    properties: {
      data: {
        type: 'object',
        required: ['cards'],
        properties: {
          cards: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id', 'rarity', 'status', 'character_name', 'serial_number', 'image_url'],
              properties: {
                id: { type: 'string' },
                rarity: { type: 'string' },
                status: { type: 'string', enum: Object.values(CardStatus) },
                character_name: { type: 'string' },
                serial_number: { type: 'string' },
                image_url: { type: 'string' },
              },
            },
          },
        },
      },
      message: { type: 'string' },
    },
  };

  export const collectionUpdateResponseDto: JSONSchemaType<CollectionUpdateResponseDto> = {
    $id: 'CollectionUpdateResponseDto',
    type: 'object',
    required: ['data', 'message'],
    properties: {
      data: {
        type: 'object',
        required: ['cards_collected'],
        properties: {
          cards_collected: { type: 'number' },
        },
      },
      message: { type: 'string' },
    },
  };
}
