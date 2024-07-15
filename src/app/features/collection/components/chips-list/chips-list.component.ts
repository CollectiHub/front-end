import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChipComponent } from '@components/chip/chip.component';
import { Card, CardStatus } from '@models/collection.models';
import { TranslateService } from '@ngx-translate/core';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { take } from 'rxjs';

import { stubChipList } from './chips-list.stub';

@Component({
  selector: 'app-chips-list',
  standalone: true,
  imports: [ChipComponent],
  templateUrl: './chips-list.component.html',
  styleUrl: './chips-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsListComponent {
  private readonly translateService = inject(TranslateService);
  private readonly toastService = inject(ToastService);

  chipList = signal<Card[]>(stubChipList);
  chipsPendingResponse = signal<string[]>([]);

  getLoadingStatus(chipIds: string[], chipId: string): boolean {
    return chipIds.includes(chipId);
  }

  handleChipClick(chipId: string, chip: Card): void {
    if (chip.status === CardStatus.NotExisting) {
      const message = this.translateService.instant('collection.card_not_exists.toast');
      this.toastService.open$(message, ToastColor.Medium).pipe(take(1)).subscribe();

      return;
    }

    // TO DO
    console.log(chipId);
  }
}
