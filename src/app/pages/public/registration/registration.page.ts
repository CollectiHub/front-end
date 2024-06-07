import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { PasswordComponent } from '@components/password/password.component';
import { AppConstants } from '@constants/app.constants';
import { RegularExpressions } from '@constants/regular-expressions';
import { RegistrationBody } from '@features/auth/auth.models';
import { AuthApiService } from '@features/auth/services/auth-api.service';
import { IonButton, IonContent, IonInput, IonItem, IonList, IonText } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoaderService } from '@services/loader/loader.service';
import { StorageService } from '@services/storage/storage.service';
import { switchMap, take } from 'rxjs';
import { AppValidators } from 'src/app/validators/app.validators';

import { RegistrationForm } from './registration.page.models';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    HeaderComponent,
    PasswordComponent,
  ],
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export default class RegistrationPageComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly translateService = inject(TranslateService);
  private readonly loaderService = inject(LoaderService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

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

  get usernameControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.registrationForm.get('username');
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

    const body: RegistrationBody = {
      email: <string>this.emailControl.value,
      password: <string>this.confirmPasswordControl.value,
      username: <string>this.usernameControl.value,
    };
    const loadingMessage = this.translateService.instant('register.loading');
    const request$ = this.authApiService.register$(body);

    this.loaderService
      .showUntilCompleted$(request$, loadingMessage)
      .pipe(
        switchMap((token: string) => this.storageService.set$(AppConstants.tokenStorageKey, token)),
        take(1),
      )
      .subscribe(() => this.router.navigate(['/collection']));
  }
}
