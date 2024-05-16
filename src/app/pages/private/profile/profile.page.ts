import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent, IonicModule, TranslateModule],
})
export default class ProfilePage {
}
