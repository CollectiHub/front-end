import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-progress-bar-skeleton',
  standalone: true,
  imports: [IonSkeletonText, TranslateModule],
  templateUrl: './progress-bar-skeleton.component.html',
  styleUrl: './progress-bar-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarSkeletonComponent {
  label = input.required<string>();
}
