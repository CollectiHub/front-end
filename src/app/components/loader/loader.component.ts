import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonSpinner, SpinnerTypes } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [IonSpinner],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  spinnerType = input<SpinnerTypes>('bubbles');
  color = input<string>('medium');
}
