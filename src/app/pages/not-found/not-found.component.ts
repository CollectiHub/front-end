import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonText } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [IonContent, IonText, IonButton, RouterLink, TranslateModule],
  standalone: true,
})
export default class NotFoundComponent {
  constructor() {
    addIcons({ closeCircleOutline });
  }
}
