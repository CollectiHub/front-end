import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HeaderComponent } from '@components/header/header.component';
import { PasswordComponent } from '@components/password/password.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppValidators } from 'src/app/validators/app.validators';

import { ChangePasswordForm } from './change-password.models';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonicModule, PasswordComponent, ReactiveFormsModule, TranslateModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChangePasswordPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly navController = inject(NavController);

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

  get passwordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.changePasswordForm.get('password');
  }

  getPasswordError(errors: ValidationErrors | null): string {
    return errors?.['pattern'] ? 'validation.passwords_pattern' : 'validation.required';
  }

  getConfirmPasswordError(formErrors: ValidationErrors | null): string {
    return formErrors?.['notMatchedPassword'] ? 'validation.passwords_not_match' : 'validation.required';
  }

  goToProfile(): void {
    this.navController.navigateBack('/profile');
  }
}
