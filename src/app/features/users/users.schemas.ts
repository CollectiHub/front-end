import { GenericApiResponse } from '@models/api.models';
import { ApiSchemas } from '@schemas/api.schemas';
import { JSONSchemaType } from 'ajv';

export namespace UsersSchemas {
  export const verifyEmailResponseDto: JSONSchemaType<GenericApiResponse> = {
    $id: 'VerifyEmailResponseDto',
    ...ApiSchemas.genericApiResponse,
  };

  export const requestPasswordResetResponseDto: JSONSchemaType<GenericApiResponse> = {
    $id: 'RequestPasswordresetResponseDto',
    ...ApiSchemas.genericApiResponse,
  };
}
