import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { stubRarityList } from '@features/collection/components/rarity-slider/rarities.stub';
import { RaritySliderComponent } from '@features/collection/components/rarity-slider/rarity-slider.component';
import { CollectionSettingsComponent } from '@features/collection-settings/components/collection-settings/collection-settings.component';
import { CollectionSettingsStore } from '@features/collection-settings/store/collection-settings.store';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonIcon,
    IonMenu,
    IonMenuToggle,
    CollectionSettingsComponent,
    RaritySliderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CollectionPage {
  private readonly collectionSettingsStore = inject(CollectionSettingsStore);

  selectedRarity = this.collectionSettingsStore.selectedRarity;

  rarities = signal<string[]>(stubRarityList);

  constructor() {
    addIcons({ settingsOutline });
  }

  handleSelectRarity(rarity: string): void {
    if (rarity === this.selectedRarity()) return;

    this.collectionSettingsStore.updateSettings({ selectedRarity: rarity });
  }
}
