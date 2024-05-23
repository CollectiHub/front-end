import { FormControl } from '@angular/forms';

export interface EditUserDataForm {
  username: FormControl<string>;
  email: FormControl<string>;
}
