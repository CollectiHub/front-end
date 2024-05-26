import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { UsersStore } from '@features/users/store/users.store';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonTabButton,
  IonText,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonListHeader,
    IonIcon,
    IonTabButton,
    IonSkeletonText,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonText,
    HeaderComponent,
    CommonModule,
    TranslateModule,
    RouterLink,
  ],
})
export default class ProfilePage {
  private readonly usersStore = inject(UsersStore);

  userData = this.usersStore.userData;

  constructor() {
    addIcons({ createOutline });
  }
}
