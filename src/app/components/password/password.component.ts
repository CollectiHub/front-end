import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { NoopCustomFormControlDirective } from 'src/app/directives/noop-custom-form-control.directive';

@Component({
  selector: 'app-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonInput, IonInputPasswordToggle, TranslateModule, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  hostDirectives: [NoopCustomFormControlDirective],
})
export class PasswordComponent {
  private readonly ngControl = inject(NgControl);

  label = input.required<string>();
  helperText = input.required<string>();
  error = input.required<string>();

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  constructor() {
    addIcons({ eyeOutline, eyeOffOutline });
  }
}
