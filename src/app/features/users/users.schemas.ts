import { GenericApiResponse } from '@models/api.models';
import { ApiSchemas } from '@schemas/api.schemas';
import { JSONSchemaType } from 'ajv';

import { UserDataResponseDto, UserRole } from './users.models';

export namespace UsersSchemas {
  export const verifyEmailResponseDto: JSONSchemaType<GenericApiResponse> = {
    $id: 'VerifyEmailResponseDto',
    ...ApiSchemas.genericApiResponse,
  };

  export const requestPasswordResetResponseDto: JSONSchemaType<GenericApiResponse> = {
    $id: 'RequestPasswordresetResponseDto',
    ...ApiSchemas.genericApiResponse,
  };

  export const verifyPasswordResetResponseDto: JSONSchemaType<GenericApiResponse> = {
    $id: 'VerifyPasswordresetResponseDto',
    ...ApiSchemas.genericApiResponse,
  };

  export const resendVerificationEmailResponseDto: JSONSchemaType<GenericApiResponse> = {
    $id: 'ResendVerificationEmailResponseDto',
    ...ApiSchemas.genericApiResponse,
  };

  export const deleteUserResponseDto: JSONSchemaType<GenericApiResponse> = {
    $id: 'DeleteUserResponseDto',
    ...ApiSchemas.genericApiResponse,
  };
  export const updateUserResponseDto: JSONSchemaType<GenericApiResponse> = {
    $id: 'UpdateUserResponseDto',
    ...ApiSchemas.genericApiResponse,
  };

  export const userDataResponseSchema: JSONSchemaType<UserDataResponseDto> = {
    $id: 'UserDataResponseDto',
    type: 'object',
    required: ['data', 'message'],
    properties: {
      data: {
        type: 'object',
        required: ['email', 'id', 'role', 'username', 'verified'],
        properties: {
          email: { type: 'string' },
          id: { type: 'string' },
          role: { type: 'string', enum: Object.values(UserRole) },
          username: { type: 'string' },
          verified: { type: 'boolean' },
        },
      },
      message: { type: 'string' },
    },
  };
}
