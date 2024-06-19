import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
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
  @Input({ required: true }) routePath: string = '';

  private readonly navController = inject(NavController);

  constructor() {
    addIcons({ arrowBackOutline });
  }

  navigate(): void {
    this.navController.navigateBack(this.routePath);
  }
}
