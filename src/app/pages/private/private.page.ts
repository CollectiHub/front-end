import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UsersStore } from '@features/users/store/users.store';
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
export default class PrivatePage implements OnInit {
  private readonly usersStore = inject(UsersStore);

  constructor() {
    addIcons({ search, library, radio, personCircleOutline });
  }

  ngOnInit(): void {
    this.usersStore.loadUserData();
  }
}
