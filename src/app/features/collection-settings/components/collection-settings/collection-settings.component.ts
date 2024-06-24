import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardsDisplayMode, CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
import CollectionProgressSettingsComponent from '@features/collection-settings/rarity-mode-setting/collection-progress-setting.component';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuToggle,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addOutline, closeOutline, imageOutline, tabletLandscapeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-collection-settings',
  standalone: true,
  imports: [
    IonFooter,
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
    CollectionProgressSettingsComponent,
  ],
  templateUrl: './collection-settings.component.html',
  styleUrl: './collection-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionSettingsComponent {
  CollectionProgressMode = CollectionProgressMode;
  CardsDisplayMode = CardsDisplayMode;

  constructor() {
    addIcons({ closeOutline, tabletLandscapeOutline, imageOutline, addOutline });
  }

  handleCardsViewModeChange(mode: CardsDisplayMode): void {}
}
