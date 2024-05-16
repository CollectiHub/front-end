import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-read-only-profile-view',
  templateUrl: './read-only-profile-view.component.html',
  styleUrls: ['./read-only-profile-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, TranslateModule, CommonModule],
})
export default class ReadOnlyProfileViewComponent {
  startEditProfile = output<void>();
}
