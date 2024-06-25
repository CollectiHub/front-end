import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-rarity-slider',
  standalone: true,
  imports: [IonCardContent, IonCard],
  templateUrl: './rarity-slider.component.html',
  styleUrl: './rarity-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaritySliderComponent {
  rarities = input.required<string[]>();
  selectedRarity = input.required<string>();

  selectRarity = output<string>();

  onClick(rarity: string): void {
    this.selectRarity.emit(rarity);
  }
}
