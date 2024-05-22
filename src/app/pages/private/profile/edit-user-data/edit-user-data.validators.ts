import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace EditUserDataValidators {
  export const someControlValueChanged =
    (requiredControls: string[], initialValue: Record<string, string>): ValidatorFn =>
    (form: AbstractControl): ValidationErrors | null => {
      const isSomeControlChanged = requiredControls.some((controlName: string) => {
        const control = form.get(controlName);

        if (!control) return true;

        return control.value !== initialValue[controlName];
      });

      if (isSomeControlChanged) return null;

      return { valuesNotChanged: true };
    };
}
