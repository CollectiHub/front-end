import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageConstants } from 'src/app/constants/languages';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [IonicModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss'],
})
export class PublicHeaderComponent {
  readonly translateService = inject(TranslateService);
  title = input.required<string>();

  supporedLanguages = LanguageConstants.supportedLanuages;
  
}
