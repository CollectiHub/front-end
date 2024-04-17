import { FormControl, FormGroup } from '@angular/forms';

import { RegistrationValidators } from './registration.page.validators';

describe('RegistrationValidators', () => {
  let formGroupMock: FormGroup<{ password: FormControl<string>; confirmPassword: FormControl<string> }>;

  beforeEach(() => {
    formGroupMock = new FormGroup({
      password: new FormControl('', { nonNullable: true }),
      confirmPassword: new FormControl('', { nonNullable: true }),
    });
  });

  describe('passwordsMatch', () => {
    describe('null result', () => {
      it('should return null if password control has no value', () => {
        formGroupMock.controls['confirmPassword'].setValue('123');

        const result = RegistrationValidators.passwordsMatch(formGroupMock);

        expect(result).toBeNull();
      });

      it('should return null if confirmPassword control has no value', () => {
        formGroupMock.controls['password'].setValue('123');

        const result = RegistrationValidators.passwordsMatch(formGroupMock);

        expect(result).toBeNull();
      });

      it('should return null controls value match', () => {
        formGroupMock.controls['password'].setValue('123');
        formGroupMock.controls['confirmPassword'].setValue('123');

        const result = RegistrationValidators.passwordsMatch(formGroupMock);

        expect(result).toBeNull();
      });

      it('should reset control of "confirmPassword" control', () => {
        formGroupMock.controls['password'].setValue('123');
        formGroupMock.controls['confirmPassword'].setValue('123');

        RegistrationValidators.passwordsMatch(formGroupMock);

        expect(formGroupMock.controls['confirmPassword'].errors).toBeNull();
      });
    });

    describe('error result', () => {
      it('should set "notMatchedPassword" error to "confirmPassword" control if passwords not match', () => {
        formGroupMock.controls['password'].setValue('123');
        formGroupMock.controls['confirmPassword'].setValue('1234');

        RegistrationValidators.passwordsMatch(formGroupMock);

        expect(formGroupMock.controls['confirmPassword'].errors).toStrictEqual({ notMatchedPassword: true });
      });

      it('should return "notMatchedPassword" error if passwords not match', () => {
        formGroupMock.controls['password'].setValue('123');
        formGroupMock.controls['confirmPassword'].setValue('1234');

        const result = RegistrationValidators.passwordsMatch(formGroupMock);

        expect(result).toStrictEqual({ notMatchedPassword: true });
      });
    });
  });
});
