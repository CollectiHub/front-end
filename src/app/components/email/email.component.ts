import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { NoopCustomFormControlDirective } from '@directives/noop-custom-form-control.directive';
import { IonInput } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [IonInput, ReactiveFormsModule, TranslateModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [NoopCustomFormControlDirective],
})
export class EmailComponent {
  private readonly ngControl = inject(NgControl);

  label = input<string>('email_label');
  helperText = input<string>('email_helper');

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  getErrorText(errors: ValidationErrors | null): string {
    return errors?.['required'] ? 'validation.required' : 'validation.invalid_email';
  }
}
