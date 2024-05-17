import { FormControl } from '@angular/forms';

export interface EditProfileForm {
  email: FormControl<string>;
  username: FormControl<string>;
  oldPassword: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
