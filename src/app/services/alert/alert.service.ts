import { Injectable, inject } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@models/ionic.models';
import { Observable, from, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly alertController = inject(AlertController);

  openWithListener$<T>(options: AlertOptions): Observable<OverlayEventDetail<T>> {
    return from(this.alertController.create(options)).pipe(
      tap((alertElement: HTMLIonAlertElement) => alertElement.present()),
      switchMap((alertElement: HTMLIonAlertElement) => alertElement.onDidDismiss()),
    );
  }
}
