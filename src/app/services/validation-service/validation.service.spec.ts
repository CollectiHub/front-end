import { JSONSchemaType } from 'ajv';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;
  const schema: JSONSchemaType<{ name: string; id: string }> = {
    $id: 'TestSchema',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
    },
    required: ['name', 'id'],
  };

  beforeEach(() => {
    service = new ValidationService();
  });

  it('should return valid data if validation not failed', () => {
    const data = {
      name: 'Test',
      id: 'test2',
    };

    expect(service.validate(schema, data)).toBe(data);
  });

  it('should throw an error if validation failed', () => {
    const data = {
      email: 'notValid',
    };

    expect(() => service.validate(schema, data)).toThrow(
      "[TestSchema] Schema validation failed: must have required property 'name'",
    );
  });
});
