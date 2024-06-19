import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IonButton, IonIcon, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton, IonIcon],
})
export class BackButtonComponent {
  private readonly navController = inject(NavController);

  routePath = input.required<string>();

  constructor() {
    addIcons({ arrowBackOutline });
  }

  navigate(): void {
    this.navController.navigateBack(this.routePath());
  }
}
