import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, input, output, signal } from '@angular/core';
import { IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-rarity-slider',
  standalone: true,
  imports: [NgClass, IonButton, IonCardContent, IonCard, NgFor],
  templateUrl: './rarity-slider.component.html',
  styleUrl: './rarity-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaritySliderComponent implements OnInit {
  rarities = input.required<string[]>();
  lastSelectedRarity = input.required<string>();

  currentSelectedRarity = signal<string>('');
  selectRarity = output<string>();

  ngOnInit(): void {
    this.currentSelectedRarity.set(this.lastSelectedRarity());
  }

  onClick(rarity: string): void {
    this.currentSelectedRarity.set(rarity);
    this.selectRarity.emit(rarity);
  }
}
