import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HeaderComponent } from '@components/header/header.component';
import { PasswordComponent } from '@components/password/password.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { UsersApiService } from '@features/users/services/users-api.service';
import { ChangePasswordBody } from '@features/users/users.models';
import { IonButton, IonContent, IonItem, IonList, NavController } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderService } from '@services/loader/loader.service';
import { take } from 'rxjs';
import { AppValidators } from 'src/app/validators/app.validators';

import { ChangePasswordForm } from './change-password.models';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonButton,
    PasswordComponent,
    ReactiveFormsModule,
    TranslateModule,
    HeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChangePasswordPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly navController = inject(NavController);
  private readonly usersApiService = inject(UsersApiService);
  private readonly loaderService = inject(LoaderService);

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
    return errors?.['pattern'] ? 'validation.passwords_pattern' : 'validation.required';
  }

  getConfirmPasswordError(formErrors: ValidationErrors | null): string {
    return formErrors?.['notMatchedPassword'] ? 'validation.passwords_not_match' : 'validation.required';
  }

  changePassword(): void {
    const body: ChangePasswordBody = {
      old_password: <string>this.oldPasswordControl.value,
      new_password: <string>this.passwordControl.value,
    };

    const request$ = this.usersApiService.changePassword$(body);

    this.loaderService.showUntilCompleted$(request$).pipe(take(1)).subscribe();
  }

  goToProfile(): void {
    this.navController.navigateBack('/profile');
  }
}
