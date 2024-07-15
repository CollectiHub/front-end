import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonChip, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { Card, CardStatus } from '@models/collection.models';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [NgClass, IonChip, IonLabel, IonSpinner],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  readonly status = CardStatus;

  card = input.required<Card>();
  isLoading = input.required<boolean>();

  clickChip = output<string>();

  handleChipClick(id: string): void {
    this.clickChip.emit(id);
  }
}
