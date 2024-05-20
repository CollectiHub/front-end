import { FormControl, FormGroup } from '@angular/forms';

import { EditProfileViewValidators } from './edit-profile-view.validators';

describe('EditProfileViewValidators', () => {
  describe('requiredControslValueChanged', () => {
    describe('valid result', () => {
      it('should return null, if some control has changed value', () => {
        const formMock = new FormGroup({
          test: new FormControl('123'),
          test2: new FormControl('234'),
        });

        const validatorFn = EditProfileViewValidators.requiredControslValueChanged(['test', 'test2'], {
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

        const validatorFn = EditProfileViewValidators.requiredControslValueChanged(['test1'], {
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

        const validatorFn = EditProfileViewValidators.requiredControslValueChanged(['test', 'test2'], {
          test: '123',
          test2: '234',
        });
        const result = validatorFn(formMock);

        expect(result).toStrictEqual({ valuesNotChanged: true });
      });
    });
  });
});
