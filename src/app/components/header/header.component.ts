import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonIcon, IonImg, IonText, IonToolbar } from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';

import { SelectLanguageComponent } from '../select-language/select-language.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IonIcon,
    IonHeader,
    IonToolbar,
    IonImg,
    IonText,
    TranslateModule,
    LetDirective,
    SelectLanguageComponent,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = input.required<string>();
}
