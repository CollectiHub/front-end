import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordComponent } from '@components/password/password.component';
import { PublicHeaderComponent } from '@components/public-header/public-header.component';
import { AppConstants } from '@constants/app.constants';
import { RegularExpressions } from '@constants/regular-expressions';
import { LoginBody } from '@features/auth/auth.models';
import { AuthApiService } from '@features/auth/services/auth-api.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '@services/storage-service/storage.service';
import { take } from 'rxjs';

import { LoginForm } from './login.page.models';

@Component({
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, TranslateModule, RouterLink, PublicHeaderComponent, PasswordComponent],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export default class LoginPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly storageService = inject(StorageService);

  loginForm = this.formBuilder.group<LoginForm>({
    email: this.formBuilder.control(undefined, [Validators.required, Validators.pattern(RegularExpressions.email)]),
    password: this.formBuilder.control(undefined, [Validators.required]),
  });

  get emailControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.loginForm.get('email');
  }

  getEmailError(errors: ValidationErrors | null): string {
    return errors?.['required'] ? 'validation.required' : 'validation.invalid_email';
  }

  onLoginFormSubmit(): void {
    if (!this.loginForm.valid) return;

    this.authApiService
      .login$(<LoginBody>this.loginForm.value)
      .pipe(take(1))
      .subscribe((token: string) => this.storageService.set(AppConstants.tokenStorageKey, token));
  }
}
