import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonIcon, IonImg, IonText, IonToolbar } from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';

import { SelectLanguageComponent } from '../select-language/select-language.component';

@Component({
  selector: 'app-public-header',
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
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss'],
})
export class PublicHeaderComponent {}
