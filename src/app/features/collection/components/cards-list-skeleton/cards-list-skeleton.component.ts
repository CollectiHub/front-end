import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cards-list-skeleton',
  standalone: true,
  imports: [IonSkeletonText],
  templateUrl: './cards-list-skeleton.component.html',
  styleUrl: './cards-list-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListSkeletonComponent {
  cardListLength = input<number>();
  array = computed(() => {
    return new Array(this.cardListLength()).fill(0);
  });
}
