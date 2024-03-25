import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EMAIL_REGEXP } from 'src/app/constants/regular-expressions';

import { RegistrationForm } from './registration.page.models';
import { RegistrationValidators } from './registration.page.validators';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export default class RegistrationComponent {
  readonly formBuilder = inject(NonNullableFormBuilder);

  registrationForm = this.formBuilder.group<RegistrationForm>(
    {
      username: this.formBuilder.control(undefined, [Validators.required]),
      email: this.formBuilder.control(undefined, [Validators.required, Validators.pattern(EMAIL_REGEXP)]),
      password: this.formBuilder.control(undefined, [Validators.required]),
      confirmPassword: this.formBuilder.control(undefined, [Validators.required]),
    },
    { validators: RegistrationValidators.passwordsMatch },
  );

  onRegistrationFormSubmit(): void {
    console.log('submit');
  }
}
