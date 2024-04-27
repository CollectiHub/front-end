import { Injectable } from '@angular/core';
import Ajv, { ErrorObject, JSONSchemaType, ValidateFunction } from 'ajv';
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private readonly ajv = new Ajv();

  validate<T, K>(schema: JSONSchemaType<K>, data: T): T {
    const validateFn: ValidateFunction = this.ajv.compile(schema);
    const isValid = validateFn(data);

    if (!isValid) {
      const errors: ErrorObject[] = validateFn.errors ?? [];
      const errorMessage: string = errors.map(error => error.message).join('\n');
      const schemaId = schema['$id'] || 'Unknown Schema';

      throw new Error(`[${schemaId}] Schema validation failed: ${errorMessage}`);
    }
    return data;
  }
}
