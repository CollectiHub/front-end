import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordComponent } from '@components/password/password.component';
import { PublicHeaderComponent } from '@components/public-header/public-header.component';
import { AppConstants } from '@constants/app.constants';
import { RegularExpressions } from '@constants/regular-expressions';
import { UsersApiService } from '@features/users/services/users-api.service';
import { IonicModule } from '@ionic/angular';
import { ToastOptions } from '@ionic/angular';
import { OverlayEventDetail } from '@models/ionic.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastService } from '@services/toast/toast.service';
import { Observable, switchMap, take } from 'rxjs';
import { AppValidators } from 'src/app/validators/app.validators';

import { ResetPasswordForm } from './reset-password.models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, RouterLink, TranslateModule, PublicHeaderComponent, PasswordComponent],
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
    return errors?.['pattern'] ? 'validation.passwords_pattern' : 'validation.required';
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
        switchMap(() => this.translateService.get('reset_password.toast')),
        switchMap((message: string) => this.openToast$(message)),
        take(1),
      )
      .subscribe();
  }

  private openToast$(message: string): Observable<OverlayEventDetail<void>> {
    const toastOptions: ToastOptions = {
      message,
      duration: AppConstants.toastDuration,
      cssClass: 'app-toast',
      position: 'bottom',
      color: 'success',
      buttons: [{ icon: 'close-outline', role: 'cancel' }],
    };

    return this.toastService.openWithListener$(toastOptions);
  }
}
