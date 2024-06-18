import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppConstants } from '@constants/app.constants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-support-info',
  templateUrl: './support-info.component.html',
  styleUrls: ['./support-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class SupportInfoComponent {
  readonly supportEmail = AppConstants.supportEmail;
}
