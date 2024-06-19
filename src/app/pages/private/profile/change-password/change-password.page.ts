import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { BackButtonComponent } from '@components/back-button/back-button.component';
import { PasswordComponent } from '@components/password/password.component';
import { AppConstants } from '@constants/app.constants';
import { RegularExpressions } from '@constants/regular-expressions';
import { UsersApiService } from '@features/users/services/users-api.service';
import { ChangePasswordBody } from '@features/users/users.models';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonToolbar,
  ToastOptions,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoaderService } from '@services/loader/loader.service';
import { ToastService } from '@services/toast/toast.service';
import { Observable, switchMap, take } from 'rxjs';
import { AppValidators } from 'src/app/validators/app.validators';

import { ChangePasswordForm } from './change-password.models';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [
    IonToolbar,
    IonButtons,
    IonHeader,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    PasswordComponent,
    ReactiveFormsModule,
    TranslateModule,
    BackButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChangePasswordPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly usersApiService = inject(UsersApiService);
  private readonly loaderService = inject(LoaderService);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);

  changePasswordForm = this.formBuilder.group<ChangePasswordForm>(
    {
      oldPassword: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', [Validators.required, Validators.pattern(RegularExpressions.password)]),
      confirmPassword: this.formBuilder.control('', Validators.required),
    },
    {
      validators: AppValidators.passwordsMatch,
    },
  );

  get oldPasswordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.changePasswordForm.get('oldPassword');
  }

  get passwordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.changePasswordForm.get('password');
  }

  getPasswordError(errors: ValidationErrors | null): string {
    return errors?.['pattern'] ? 'validation.password_pattern' : 'validation.required';
  }

  getConfirmPasswordError(formErrors: ValidationErrors | null): string {
    return formErrors?.['notMatchedPassword'] ? 'validation.passwords_not_match' : 'validation.required';
  }

  changePassword(): void {
    if (!this.changePasswordForm.valid) return;

    const body: ChangePasswordBody = {
      old_password: <string>this.oldPasswordControl.value,
      new_password: <string>this.passwordControl.value,
    };

    const request$ = this.usersApiService.changePassword$(body);

    this.loaderService
      .showUntilCompleted$(request$)
      .pipe(
        switchMap(() => this.openSuccessToast$()),
        take(1),
      )
      .subscribe(() => {
        this.changePasswordForm.reset();
        this.cdr.markForCheck();
      });
  }

  private openSuccessToast$(): Observable<HTMLIonToastElement> {
    const toastOptions: ToastOptions = {
      message: this.translateService.instant('change_password.toast'),
      duration: AppConstants.toastDuration,
      cssClass: 'app-toast',
      position: 'bottom',
      color: 'success',
      buttons: [{ icon: 'close-outline', role: 'cancel' }],
    };

    return this.toastService.open$(toastOptions);
  }
}
