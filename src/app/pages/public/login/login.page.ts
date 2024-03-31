import { Component, inject, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { PublicHeaderComponent } from 'src/app/components/public-header/public-header.component';
import { RegularExpressions } from 'src/app/constants/regular-expressions';

import { LoginForm } from './login.page.models';

@Component({
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, TranslateModule, RouterLink, PublicHeaderComponent],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export default class LoginPage {
  readonly formBuilder = inject(NonNullableFormBuilder);

  loginForm = this.formBuilder.group<LoginForm>({
    email: this.formBuilder.control(undefined, [Validators.required, Validators.pattern(RegularExpressions.email)]),
    password: this.formBuilder.control(undefined, [Validators.required]),
  });
  isPasswordRevealed = signal(false);

  get emailControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.loginForm.get('email');
  }

  constructor() {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  togglePasswordReveal(): void {
    this.isPasswordRevealed.set(!this.isPasswordRevealed());
  }

  getEmailError(errors: ValidationErrors | null): string {
    return errors?.['required'] ? 'validation.required' : 'validation.invalid_email';
  }

  onLoginFormSubmit(): void {
    console.log(this.loginForm.value);
  }
}
