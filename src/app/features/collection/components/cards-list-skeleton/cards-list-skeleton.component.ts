import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  array = new Array(6).fill(0);
}
