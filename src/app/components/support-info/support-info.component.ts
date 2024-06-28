import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppConstants } from '@constants/app.constants';
import { IonRippleEffect } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-support-info',
  standalone: true,
  imports: [IonRippleEffect, TranslateModule],
  templateUrl: './support-info.component.html',
  styleUrl: './support-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportInfoComponent {
  supportEmail = AppConstants.supportEmail;
}
