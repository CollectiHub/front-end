import { JSONSchemaType } from 'ajv';

import { VerifyEmailResponseDto } from './users.models';

export namespace UsersSchemas {
  export const verifyEmailResponseDto: JSONSchemaType<VerifyEmailResponseDto> = {
    $id: 'VerifyEmailResponseDto',
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
