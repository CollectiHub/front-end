import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonButton, IonTabButton, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-collection-fetch-error',
  standalone: true,
  imports: [IonText, IonButton, IonTabButton],
  templateUrl: './collection-fetch-error.component.html',
  styleUrl: './collection-fetch-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionFetchErrorComponent {
  label = input.required<string>();
  buttonText = input.required<string>();

  tryAgainClicked = output<void>();

  onTryAgainClick(): void {
    this.tryAgainClicked.emit();
  }
}
