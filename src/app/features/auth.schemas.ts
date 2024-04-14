import { JSONSchemaType } from 'ajv';

import { LoginResponseDto, RegisterResponseDto } from './auth/auth.models';

export namespace AuthSchemas {
  export const loginResponseDto: JSONSchemaType<LoginResponseDto> = {
    $id: 'LoginResponseDto',
    type: 'object',
    required: ['data', 'message'],
    properties: {
      data: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
        },
        required: ['accessToken'],
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
}
