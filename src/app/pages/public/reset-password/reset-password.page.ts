import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RegularExpressions } from 'src/app/constants/regular-expressions';

@Component({
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, TranslateModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export default class ResetPasswordComponent {
  resetPasswordFormControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(RegularExpressions.email)],
  });

  getControlError(errors: ValidationErrors | null): string {
    return errors?.['required'] ? 'validation.required' : 'validation.invalid_email';
  }

  submitResetPassword(): void {
    console.log(this.resetPasswordFormControl.value);
  }
}
