import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { PublicHeaderComponent } from 'src/app/components/public-header/public-header.component';
import { RegularExpressions } from 'src/app/constants/regular-expressions';

import { RegistrationForm } from './registration.page.models';
import { RegistrationValidators } from './registration.page.validators';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ReactiveFormsModule, TranslateModule, RouterLink, PublicHeaderComponent],
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export default class RegistrationPageComponent {
  readonly formBuilder = inject(NonNullableFormBuilder);

  isPasswordRevealed = signal(false);
  isConfirmPasswordRevealed = signal(false);

  registrationForm = this.formBuilder.group<RegistrationForm>(
    {
      username: this.formBuilder.control(undefined, [Validators.required]),
      email: this.formBuilder.control(undefined, [Validators.required, Validators.pattern(RegularExpressions.email)]),
      password: this.formBuilder.control(undefined, [Validators.required]),
      confirmPassword: this.formBuilder.control(undefined, [Validators.required]),
    },
    { validators: RegistrationValidators.passwordsMatch },
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

  constructor() {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  togglePasswordReveal(): void {
    this.isPasswordRevealed.set(!this.isPasswordRevealed());
  }

  toggleConfirmPasswordReveal(): void {
    this.isConfirmPasswordRevealed.set(!this.isConfirmPasswordRevealed());
  }

  getEmailError(errors: ValidationErrors | null): string {
    return errors?.['required'] ? 'validation.required' : 'validation.invalid_email';
  }

  getPasswordError(errors: ValidationErrors | null): string {
    return 'validation.required';
  }

  getConfirmPasswordError(formErrors: ValidationErrors | null, controlErros: ValidationErrors | null): string {
    if (formErrors?.['notMatchedPassword']) return 'validation.passwords_not_match';
    return 'validation.required';
  }

  onRegistrationFormSubmit(): void {
    console.log('submit');
  }
}
