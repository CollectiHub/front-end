import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordComponent } from '@components/password/password.component';
import { PublicHeaderComponent } from '@components/public-header/public-header.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { RegistrationBody } from '@features/auth/auth.models';
import { AuthApiService } from '@features/auth/services/auth-api.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { take } from 'rxjs';
import { AppValidators } from 'src/app/validators/app.validators';

import { RegistrationForm } from './registration.page.models';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ReactiveFormsModule, TranslateModule, RouterLink, PublicHeaderComponent, PasswordComponent],
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export default class RegistrationPageComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authApiService = inject(AuthApiService);

  registrationForm = this.formBuilder.group<RegistrationForm>(
    {
      username: this.formBuilder.control(undefined, [Validators.required]),
      email: this.formBuilder.control(undefined, [Validators.required, Validators.pattern(RegularExpressions.email)]),
      password: this.formBuilder.control(undefined, [
        Validators.required,
        Validators.pattern(RegularExpressions.password),
      ]),
      confirmPassword: this.formBuilder.control(undefined, [Validators.required]),
    },
    { validators: AppValidators.passwordsMatch },
  );

  get emailControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.registrationForm.get('email');
  }

  get passwordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.registrationForm.get('password');
  }

  get confirmPasswordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.registrationForm.get('confirmPassword');
  }

  getEmailError(errors: ValidationErrors | null): string {
    return errors?.['required'] ? 'validation.required' : 'validation.invalid_email';
  }

  getPasswordError(errors: ValidationErrors | null): string {
    return errors?.['pattern'] ? 'validation.passwords_pattern' : 'validation.required';
  }

  getConfirmPasswordError(formErrors: ValidationErrors | null): string {
    return formErrors?.['notMatchedPassword'] ? 'validation.passwords_not_match' : 'validation.required';
  }

  onRegistrationFormSubmit(): void {
    if (!this.registrationForm.valid) return;

    this.authApiService
      .register$(<RegistrationBody>this.registrationForm.value)
      .pipe(take(1))
      .subscribe(console.log);
  }
}
