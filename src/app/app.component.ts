import { Component, NgZone, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { IonApp } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, RouterOutlet],
})
export class AppComponent {
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);

  constructor() {
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
