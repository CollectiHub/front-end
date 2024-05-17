import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PasswordComponent } from '@components/password/password.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppValidators } from 'src/app/validators/app.validators';

import { EditProfileForm } from './edit-profile-view.models';

@Component({
  selector: 'app-edit-profile-view',
  templateUrl: './edit-profile-view.component.html',
  styleUrls: ['./edit-profile-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, TranslateModule, CommonModule, ReactiveFormsModule, PasswordComponent],
})
export default class EditProfileViewComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  editProfileForm = this.formBuilder.group<EditProfileForm>(
    {
      email: this.formBuilder.control('test@gg.gg', [
        Validators.required,
        Validators.pattern(RegularExpressions.email),
      ]),
      username: this.formBuilder.control('realhokage', [Validators.required]),
      oldPassword: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required, Validators.pattern(RegularExpressions.password)]),
      confirmPassword: this.formBuilder.control('', [Validators.required]),
    },
    { validators: AppValidators.passwordsMatch },
  );

  get passwordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('password');
  }

  get confirmPasswordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('confirmPassword');
  }

  get emailControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('email');
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
}
