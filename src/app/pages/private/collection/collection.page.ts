import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardsListComponent } from '@features/collection/components/cards-list/cards-list.component';
import { stubCardList } from '@features/collection/components/cards-list/cards-list.stub';
import { ChipsListComponent } from '@features/collection/components/chips-list/chips-list.component';
import { ProgressBarComponent } from '@features/collection/components/progress-bar/progress-bar.component';
import { stubRarityList } from '@features/collection/components/rarity-slider/rarities.stub';
import { RaritySliderComponent } from '@features/collection/components/rarity-slider/rarity-slider.component';
import { SearchBarComponent } from '@features/collection/components/search-bar/search-bar.component';
import { CollectionApiService } from '@features/collection/services/collection-api.service';
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
import { Card } from '@models/collection.models';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { of, switchMap } from 'rxjs';

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
    ChipsListComponent,
    CardsListComponent,
    CollectionSettingsComponent,
    ProgressBarComponent,
    RaritySliderComponent,
    SearchBarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CollectionPage implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly collectionApiService = inject(CollectionApiService);
  private readonly collectionSettingsStore = inject(CollectionSettingsStore);

  readonly progressDisplayMode = CollectionProgressMode;
  readonly cardsDisplayModeEnum = CardsDisplayMode;

  searchBar = viewChild.required(SearchBarComponent);

  globalProgressDisplayMode = this.collectionSettingsStore.globalProgressDisplayMode;
  rarityProgressDisplayMode = this.collectionSettingsStore.rarityProgressDisplayMode;
  selectedRarity = this.collectionSettingsStore.selectedRarity;
  cardsDisplayMode = this.collectionSettingsStore.cardsDisplayMode;

  globalCollectedCardCount = signal<number>(25);
  globalTotalCardCount = signal<number>(100);
  rarityCollectedCardCount = signal<number>(10);
  rarityTotalCardCount = signal<number>(20);
  rarities = signal<string[]>(stubRarityList);

  cardsList = signal<Card[]>(stubCardList);
  searchList = signal<Card[] | null>(null);
  isSearchActive = signal<boolean>(false);

  constructor() {
    addIcons({ settingsOutline });
  }

  ngAfterViewInit(): void {
    this.searchBar()
      .searchTerm$()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((searchTerm: string) => {
          if (searchTerm) {
            this.isSearchActive.set(true);

            return this.collectionApiService.getCardsBySearchTerm$(searchTerm);
          }

          this.isSearchActive.set(false);

          return of(null);
        }),
      )
      .subscribe({
        next: (res: Card[] | null) => {
          this.searchList.set(res);
        },
      });
  }

  handleSelectRarity(rarity: string): void {
    if (this.isSearchActive()) {
      this.searchBar()?.clearInput();
    }

    if (rarity === this.selectedRarity()) return;

    this.collectionSettingsStore.updateSettings({ selectedRarity: rarity });
  }
}
