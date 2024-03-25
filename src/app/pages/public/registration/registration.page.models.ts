import { FormControl } from '@angular/forms';

export interface RegistrationForm {
  username: FormControl<string | undefined>;
  email: FormControl<string | undefined>;
  password: FormControl<string | undefined>;
  confirmPassword: FormControl<string | undefined>;
}
