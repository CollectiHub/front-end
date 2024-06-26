import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { IonInput } from '@ionic/angular/standalone';
import { NoopCustomFormControlDirective } from 'src/app/directives/noop-custom-form-control.directive';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [IonInput, ReactiveFormsModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [NoopCustomFormControlDirective],
})
export class EmailComponent {
  private readonly ngControl = inject(NgControl);

  label = input.required<string>();
  helperText = input.required<string>();
  error = input.required<string>();

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
