import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LetDirective } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';

import { SelectLanguageComponent } from '../select-language/select-language.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, TranslateModule, LetDirective, SelectLanguageComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = input.required<string>();
}
