import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { IonButton, IonContent, IonItem, IonList, IonText } from '@ionic/angular/standalone';
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
  constructor() {
    addIcons({ createOutline });
  }
}
