import { FormControl, FormGroup } from '@angular/forms';

import { EditUserDataValidators } from './edit-user-data.validators';

describe('EditUserDataValidators', () => {
  describe('someControlValueChanged', () => {
    describe('valid result', () => {
      it('should return null, if some control has changed value', () => {
        const formMock = new FormGroup({
          test: new FormControl('123'),
          test2: new FormControl('234'),
        });

        const validatorFn = EditUserDataValidators.someControlValueChanged(['test', 'test2'], {
          test: '123',
          test2: '2345677',
        });
        const result = validatorFn(formMock);

        expect(result).toBeNull();
      });

      it('should return null, if no such objects in form', () => {
        const formMock = new FormGroup({
          test: new FormControl('123'),
          test2: new FormControl('234'),
        });

        const validatorFn = EditUserDataValidators.someControlValueChanged(['test1'], {
          test: '123',
          test2: '234',
        });
        const result = validatorFn(formMock);

        expect(result).toBeNull();
      });
    });

    describe('not valid result', () => {
      it('should return error object, if all of the controls have same value', () => {
        const formMock = new FormGroup({
          test: new FormControl('123'),
          test2: new FormControl('234'),
        });

        const validatorFn = EditUserDataValidators.someControlValueChanged(['test', 'test2'], {
          test: '123',
          test2: '234',
        });
        const result = validatorFn(formMock);

        expect(result).toStrictEqual({ valuesNotChanged: true });
      });
    });
  });
});
