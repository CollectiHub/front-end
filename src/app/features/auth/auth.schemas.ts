import { GenericApiResponse } from '@models/api.models';
import { ApiSchemas } from '@schemas/api.schemas';
import { JSONSchemaType } from 'ajv';

import { ResponseWithTokenDto } from './auth.models';

export namespace AuthSchemas {
  const responseWithTokenSchema: JSONSchemaType<ResponseWithTokenDto> = {
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

  export const loginResponseDto: JSONSchemaType<ResponseWithTokenDto> = {
    $id: 'LoginResponseDto',
    ...responseWithTokenSchema,
  };

  export const registerResponseDto: JSONSchemaType<ResponseWithTokenDto> = {
    $id: 'RegisterResponseDto',
    ...responseWithTokenSchema,
  };

  export const refreshTokenResponseDto: JSONSchemaType<ResponseWithTokenDto> = {
    $id: 'RefreshTokenResponseDto',
    ...responseWithTokenSchema,
  };

  export const logoutResponseDto: JSONSchemaType<GenericApiResponse> = {
    $id: 'LogoutResponseDto',
    ...ApiSchemas.genericApiResponse,
  };
}
