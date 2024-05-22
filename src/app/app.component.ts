import { Component, NgZone, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { HeaderComponent } from '@components/header/header.component';
import { IonApp } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true, 
  imports: [IonApp, RouterOutlet, HeaderComponent],
})
export class AppComponent {
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);

  constructor() {
    addIcons({ closeOutline });

    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const domain = 'collectihub.com';

        const pathArray = event.url.split(domain);

        const appPath = pathArray.at(-1) || '/not-found';

        this.router.navigateByUrl(appPath);
      });
    });
  }
}
