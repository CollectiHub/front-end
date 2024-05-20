import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PasswordComponent } from '@components/password/password.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EditProfileViewValidators } from './edit-profile-view.validators';

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

  formInitialValue = {
    email: 'test@gg.gg',
    username: 'realhokage',
  };

  editProfileForm = this.formBuilder.group(
    {
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(RegularExpressions.email)]),
      username: this.formBuilder.control('', [Validators.required]),
      // oldPassword: this.formBuilder.control('', [Validators.required]),
      // password: this.formBuilder.control('', [Validators.required, Validators.pattern(RegularExpressions.password)]),
      // confirmPassword: this.formBuilder.control('', [Validators.required]),
    },
    {
      validators: [
        EditProfileViewValidators.requiredControslValueChanged(['email', 'username'], this.formInitialValue),
      ],
    },
  );

  get emailControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('email');
  }

  get usernameControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('username');
  }

  constructor() {
    this.editProfileForm.setValue(this.formInitialValue);
  }

  // get oldPasswordControl(): FormControl<string | undefined> {
  //   return <FormControl<string | undefined>>this.editProfileForm.get('password');
  // }

  // get passwordControl(): FormControl<string | undefined> {
  //   return <FormControl<string | undefined>>this.editProfileForm.get('password');
  // }

  // get confirmPasswordControl(): FormControl<string | undefined> {
  //   return <FormControl<string | undefined>>this.editProfileForm.get('confirmPassword');
  // }

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
