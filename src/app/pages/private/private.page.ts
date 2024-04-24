import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule],
})
export default class PrivatePage {
  constructor() {
    addIcons({ search, library, radio, playCircle });
  }
}
