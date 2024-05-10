import { GenericApiResponse } from '@models/api.models';
import { JSONSchemaType } from 'ajv';

export namespace ApiSchemas {
  export const genericApiResponse: JSONSchemaType<GenericApiResponse> = {
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
