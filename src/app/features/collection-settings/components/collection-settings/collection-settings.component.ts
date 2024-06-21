import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CardsDisplayMode,
  CollectionProgressMode,
} from '@features/collection-settings/collection-settings.component.models';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItem,
  IonText,
  IonTabButton,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-collection-settings',
  standalone: true,
  imports: [
    IonTabButton,
    IonText,
    IonItem,
    IonList,
    IonIcon,
    IonButton,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonContent,
    IonMenuToggle,
    TranslateModule,
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './collection-settings.component.html',
  styleUrl: './collection-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionSettingsComponent {
  CollectionProgressMode = CollectionProgressMode;
  settings = {
    collectionProgressMode: CollectionProgressMode.Numbers,
    rarityProgressMode: CollectionProgressMode.Percentages,
    cardsDisplayMode: CardsDisplayMode.Chip,
  };
  constructor() {
    addIcons({ closeOutline });
  }
}
