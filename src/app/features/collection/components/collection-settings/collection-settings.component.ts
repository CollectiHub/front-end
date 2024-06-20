import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-collection-settings',
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonContent,
    IonMenuToggle,
    TranslateModule,
  ],
  templateUrl: './collection-settings.component.html',
  styleUrl: './collection-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionSettingsComponent {
  constructor() {
    addIcons({ closeOutline });
  }
}
