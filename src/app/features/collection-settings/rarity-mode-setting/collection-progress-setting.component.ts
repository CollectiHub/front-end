import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonButton, IonText } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

import { CollectionProgressMode } from '../collection-settings.models';

@Component({
  selector: 'app-collection-progress-setting',
  standalone: true,
  imports: [IonText, IonButton, TranslateModule],
  templateUrl: './collection-progress-setting.component.html',
  styleUrl: './collection-progress-setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CollectionProgressSettingsComponent {
  selectedMode = input.required<CollectionProgressMode>();
  label = input.required<string>();
  progressModeChange = output<CollectionProgressMode>();

  CollectionProgressMode = CollectionProgressMode;

  constructor() {
    addIcons({ addOutline });
  }

  handleProgressModeChange(mode: CollectionProgressMode): void {
    this.progressModeChange.emit(mode);
  }
}
