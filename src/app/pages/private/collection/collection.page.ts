import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonButton, IonButtons, IonHeader, IonIcon, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonToolbar, IonHeader, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CollectionPage {
  constructor() {
    addIcons({ settingsOutline });
  }
}
