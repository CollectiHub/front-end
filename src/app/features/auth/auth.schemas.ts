import { JSONSchemaType } from 'ajv';

import { LogoutResponseDto, RegisterResponseDto, ResponseWithTokenDto } from './auth.models';

export namespace AuthSchemas {
  export const responseWithTokenDto: JSONSchemaType<ResponseWithTokenDto> = {
    $id: 'LoginResponseDto',
    type: 'object',
    required: ['data', 'message'],
    properties: {
      data: {
        type: 'object',
        properties: {
          access_token: { type: 'string' },
        },
        required: ['access_token'],
      },
      message: { type: 'string' },
    },
  };

  export const registerResponseDto: JSONSchemaType<RegisterResponseDto> = {
    $id: 'RegisterResponseDto',
    type: 'object',
    required: ['data', 'message'],
    properties: {
      data: {
        type: 'object',
        required: ['email', 'id', 'role', 'username', 'verified'],
        properties: {
          email: { type: 'string' },
          id: { type: 'string' },
          role: { type: 'string' },
          username: { type: 'string' },
          verified: { type: 'boolean' },
        },
      },
      message: { type: 'string' },
    },
  };

  export const logoutResponseDto: JSONSchemaType<LogoutResponseDto> = {
    $id: 'LogoutResponseDto',
    type: 'object',
    required: ['data', 'message'],
    properties: {
      data: {
        type: 'string',
      },
      message: { type: 'string' },
    },
  };
}
