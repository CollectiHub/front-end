import { ChangeDetectionStrategy, Component, OnInit, Signal, computed, inject, signal, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardsListComponent } from '@features/collection/components/cards-list/cards-list.component';
import { stubCardList } from '@features/collection/components/cards-list/cards-list.stub';
import { ChipsListComponent } from '@features/collection/components/chips-list/chips-list.component';
import { ProgressBarComponent } from '@features/collection/components/progress-bar/progress-bar.component';
import { RaritySliderComponent } from '@features/collection/components/rarity-slider/rarity-slider.component';
import { CollectionApiService } from '@features/collection/services/collection-api.service';
import { CollectionCardsStore } from '@features/collection/store/collection-cards-store/collection-cards.store';
import { CardsLoadingMap } from '@features/collection/store/collection-cards-store/collection-cards.store.models';
import { CollectionInfoStore } from '@features/collection/store/collection-info/collection-info.store';
import { SearchCardsStore } from '@features/collection/store/search-cards/search-cards.store';
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
  IonSearchbar,
  IonSpinner,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Card, CardStatus } from '@models/collection.models';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeCircleOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonContent,
    IonButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonIcon,
    IonMenu,
    IonMenuToggle,
    IonSearchbar,
    ChipsListComponent,
    CardsListComponent,
    CollectionSettingsComponent,
    ProgressBarComponent,
    RaritySliderComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CollectionPage implements OnInit {
  private readonly collectionApiService = inject(CollectionApiService);
  private readonly collectionSettingsStore = inject(CollectionSettingsStore);
  private readonly collectionCardsStore = inject(CollectionCardsStore);
  private readonly collectionInfoStore = inject(CollectionInfoStore);
  private readonly searchCardsStore = inject(SearchCardsStore);

  readonly progressDisplayMode = CollectionProgressMode;

  cardsSearchbar: Signal<IonSearchbar | undefined> = viewChild('cardsSearchbar');

  globalProgressDisplayMode: Signal<CollectionProgressMode> = this.collectionSettingsStore.globalProgressDisplayMode;
  rarityProgressDisplayMode: Signal<CollectionProgressMode> = this.collectionSettingsStore.rarityProgressDisplayMode;
  selectedRarity: Signal<string> = this.collectionSettingsStore.selectedRarity;
  cardsDisplayMode: Signal<CardsDisplayMode> = this.collectionSettingsStore.cardsDisplayMode;

  cardsByRarity: Signal<Record<string, Card[]>> = this.collectionCardsStore.cardsByRarity;
  cardsLoadingMap: Signal<CardsLoadingMap> = this.collectionCardsStore.cardsLoadingMap;

  searchCards: Signal<Card[]> = this.searchCardsStore.entities;

  rarities: Signal<string[] | undefined> = this.collectionInfoStore.rarities;
  cardsTotal: Signal<number | undefined> = this.collectionInfoStore.cards_total;
  cardsCollected: Signal<number | undefined> = this.collectionInfoStore.cards_collected;
  // TODO: Add loader (global) for collection info fetching

  globalCollectedCardCount = signal<number>(25);
  globalTotalCardCount = signal<number>(100);
  rarityCollectedCardCount = signal<number>(10);
  rarityTotalCardCount = signal<number>(20);

  cardsList = signal<Card[]>(stubCardList);
  isLoadingCards = signal<boolean>(false);

  cardsForCurrentRarity = computed(() => {
    const existingCardsByRarity = this.cardsByRarity()[this.selectedRarity()];

    if (existingCardsByRarity) return existingCardsByRarity;

    // TODO: Add loader for fetching cards by rarity;
    // TODO: All tapResponse should be attached to API request in effect to keep effect working
    this.collectionCardsStore.fatchByRarity(this.selectedRarity());

    return [];
  });

  isImageDisplayMode = computed(() => this.cardsDisplayMode() === CardsDisplayMode.Image);

  constructor() {
    addIcons({ settingsOutline, closeCircleOutline });
  }

  ngOnInit(): void {
    this.collectionInfoStore.getCollectionInfo();
  }

  handleSearchValueChange(event: CustomEvent): void {
    const searchTerm = event.detail.value;

    if (!searchTerm) {
      this.searchCardsStore.clearSearchCards();
    } else {
      this.searchCardsStore.search(searchTerm);
    }
  }

  handleSelectRarity(rarity: string): void {
    if (this.searchCards().length) {
      this.cardsSearchbar()!.value = null;
    }

    if (rarity === this.selectedRarity()) return;

    this.collectionSettingsStore.updateSettings({ selectedRarity: rarity });
  }

  updateCardStatus(card: Card): void {
    const patch = {
      ids: [card.id],
      changes: {
        status: card.status === CardStatus.Collected ? CardStatus.NotCollected : CardStatus.Collected,
      },
    };

    this.collectionCardsStore.update(patch);
  }
}
