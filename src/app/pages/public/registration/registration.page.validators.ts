import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace RegistrationValidators {
  export const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password?.value || !confirmPassword?.value) return null;

    if (password?.value !== confirmPassword?.value) {
      confirmPassword.setErrors({ notMatchedPassword: true });
      return { notMatchedPassword: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  };
}
