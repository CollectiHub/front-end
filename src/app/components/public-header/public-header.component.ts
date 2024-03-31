import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LetDirective } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';

import { SelectLanguageComponent } from '../select-language/select-language.component';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [IonicModule, TranslateModule, LetDirective, SelectLanguageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss'],
})
export class PublicHeaderComponent {
  title = input.required<string>();
}
