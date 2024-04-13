import { FormControl } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string | undefined>;
  password: FormControl<string | undefined>;
}

