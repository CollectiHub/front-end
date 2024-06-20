import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordComponent } from '@components/password/password.component';
import { PublicHeaderComponent } from '@components/public-header/public-header.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { UsersApiService } from '@features/users/services/users-api.service';
import { IonButton, IonContent, IonItem, IonList, IonText } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { switchMap, take } from 'rxjs';
import { AppValidators } from 'src/app/validators/app.validators';

import { ResetPasswordForm } from './reset-password.models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonText,
    IonList,
    IonItem,
    IonButton,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    PasswordComponent,
    PublicHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResetPasswordPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly usersApiService = inject(UsersApiService);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);

  code = input.required<string>();

  resetPasswordForm = this.formBuilder.group<ResetPasswordForm>(
    {
      password: this.formBuilder.control(undefined, [
        Validators.required,
        Validators.pattern(RegularExpressions.password),
      ]),
      confirmPassword: this.formBuilder.control(undefined, [Validators.required]),
    },
    { validators: AppValidators.passwordsMatch },
  );

  get passwordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.resetPasswordForm.get('password');
  }

  get confirmPasswordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.resetPasswordForm.get('confirmPassword');
  }

  getPasswordError(errors: ValidationErrors | null): string {
    return errors?.['pattern'] ? 'validation.password_pattern' : 'validation.required';
  }

  getConfirmPasswordError(formErrors: ValidationErrors | null): string {
    return formErrors?.['notMatchedPassword'] ? 'validation.passwords_not_match' : 'validation.required';
  }

  submitResetPassword(): void {
    if (!this.resetPasswordForm.valid) return;

    const body = { code: this.code(), new_password: <string>this.passwordControl.value };

    this.usersApiService
      .verifyPasswordReset$(body)
      .pipe(
        switchMap(() => {
          const message = this.translateService.instant('reset_password.toast');

          return this.toastService.open$(message, ToastColor.Success);
        }),
        take(1),
      )
      .subscribe();
  }
}
