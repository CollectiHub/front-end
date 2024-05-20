import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace AppValidators {
  export const passwordsMatch: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

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
