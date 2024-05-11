import { FormControl } from '@angular/forms';

export interface ResetPasswordForm {
  password: FormControl<string | undefined>;
  confirmPassword: FormControl<string | undefined>;
}
