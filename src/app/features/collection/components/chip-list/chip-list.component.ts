import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChipComponent } from '@components/chip/chip.component';
import { Card } from '@models/collection.models';

import { stubChipList } from './chip-list.stub';

@Component({
  selector: 'app-chip-list',
  standalone: true,
  imports: [ChipComponent],
  templateUrl: './chip-list.component.html',
  styleUrl: './chip-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipListComponent {
  chipList = signal<Card[]>(stubChipList);
  chipsPendingResponse = signal<string[]>([]);

  getLoadingStatus(chipIds: string[], chipId: string): boolean {
    return chipIds.includes(chipId);
  }

  handleChipClick(chipId: string): void {
    // TO DO
    console.log(chipId);
  }
}
