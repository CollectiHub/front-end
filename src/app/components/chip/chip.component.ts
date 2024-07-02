import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonChip, IonLabel, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [NgIf, IonChip, IonLabel, IonSpinner],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  chipId = input.required<string>();
  isExists = input.required<boolean>();
  isCollected = input.required<boolean>();
  isLoading = input.required<boolean>();

  clickChip = output<string>();

  handleChipClick(id: string): void {
    this.clickChip.emit(id);
  }
}
