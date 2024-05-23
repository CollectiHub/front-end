import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { library, personCircleOutline, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, TranslateModule],
})
export default class PrivatePage {
  constructor() {
    addIcons({ search, library, radio, personCircleOutline });
  }
}
