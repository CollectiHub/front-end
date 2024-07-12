import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardListComponent } from '@features/collection/components/card-list/card-list.component';
import { ChipListComponent } from '@features/collection/components/chip-list/chip-list.component';
import { ProgressBarComponent } from '@features/collection/components/progress-bar/progress-bar.component';
import { stubRarityList } from '@features/collection/components/rarity-slider/rarities.stub';
import { RaritySliderComponent } from '@features/collection/components/rarity-slider/rarity-slider.component';
import { CardsDisplayMode, CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
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
    ChipListComponent,
    CardListComponent,
    CollectionSettingsComponent,
    ProgressBarComponent,
    RaritySliderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CollectionPage {
  private readonly collectionSettingsStore = inject(CollectionSettingsStore);

  readonly progressDisplayMode = CollectionProgressMode;
  readonly cardsDisplayModeEnum = CardsDisplayMode;

  globalProgressDisplayMode = this.collectionSettingsStore.globalProgressDisplayMode;
  rarityProgressDisplayMode = this.collectionSettingsStore.rarityProgressDisplayMode;
  selectedRarity = this.collectionSettingsStore.selectedRarity;
  cardsDisplayMode = this.collectionSettingsStore.cardsDisplayMode;

  globalCollectedCardCount = signal<number>(25);
  globalTotalCardCount = signal<number>(100);
  rarityCollectedCardCount = signal<number>(10);
  rarityTotalCardCount = signal<number>(20);
  rarities = signal<string[]>(stubRarityList);

  constructor() {
    addIcons({ settingsOutline });
  }

  handleSelectRarity(rarity: string): void {
    if (rarity === this.selectedRarity()) return;

    this.collectionSettingsStore.updateSettings({ selectedRarity: rarity });
  }
}
