import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PasswordComponent } from '@components/password/password.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { AppValidators } from 'src/app/validators/app.validators';

import { EditProfileViewValidators } from './edit-profile-view.validators';

@Component({
  selector: 'app-edit-profile-view',
  templateUrl: './edit-profile-view.component.html',
  styleUrls: ['./edit-profile-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, TranslateModule, CommonModule, ReactiveFormsModule, PasswordComponent],
})
export default class EditProfileViewComponent implements OnInit {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  private readonly passwordMatchValidatorRef = AppValidators.passwordsMatch;
  private passwordValidatorsSet = false;

  formInitialValue = {
    email: 'test@gg.gg',
    username: 'realhokage',
    oldPassword: '',
  };

  editProfileForm = this.formBuilder.group(
    {
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(RegularExpressions.email)]),
      username: this.formBuilder.control('', [Validators.required]),
      oldPassword: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      confirmPassword: this.formBuilder.control(''),
    },
    {
      validators: [
        EditProfileViewValidators.someControlValueChanged(['email', 'username', 'oldPassword'], this.formInitialValue),
      ],
    },
  );

  get emailControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('email');
  }

  get usernameControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('username');
  }

  get oldPasswordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('oldPassword');
  }

  get passwordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('password');
  }

  get confirmPasswordControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editProfileForm.get('confirmPassword');
  }

  constructor() {
    this.editProfileForm.patchValue(this.formInitialValue);
  }

  ngOnInit(): void {
    this.oldPasswordControl.valueChanges
      .pipe(map(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe((oldPaswordEntered: boolean) => {
        if (oldPaswordEntered && !this.passwordValidatorsSet) {
          this.oldPasswordControl.addValidators(Validators.required);
          this.passwordControl.addValidators([Validators.required, Validators.pattern(RegularExpressions.password)]);
          this.confirmPasswordControl.addValidators([Validators.required]);
          this.editProfileForm.addValidators(this.passwordMatchValidatorRef);

          this.passwordValidatorsSet = true;

          // TODO: Add animation for password and confirm password highlighting
          // TODO: Make password hint smaller or align eye icon correctly
          this.oldPasswordControl.updateValueAndValidity({ onlySelf: true });
          this.passwordControl.updateValueAndValidity({ onlySelf: true });
          this.confirmPasswordControl.updateValueAndValidity({ onlySelf: true });
          this.editProfileForm.updateValueAndValidity();
        }

        if (!oldPaswordEntered && this.passwordValidatorsSet) {
          this.oldPasswordControl.clearValidators();
          this.passwordControl.clearValidators();
          this.confirmPasswordControl.clearValidators();
          this.editProfileForm.removeValidators(this.passwordMatchValidatorRef);

          this.passwordValidatorsSet = false;

          this.oldPasswordControl.updateValueAndValidity({ onlySelf: true });
          this.passwordControl.updateValueAndValidity({ onlySelf: true });
          this.confirmPasswordControl.updateValueAndValidity({ onlySelf: true });
          this.editProfileForm.updateValueAndValidity();
        }
      });
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
