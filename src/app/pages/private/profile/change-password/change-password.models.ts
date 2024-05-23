import { FormControl } from '@angular/forms';

export interface ChangePasswordForm {
  oldPassword: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
