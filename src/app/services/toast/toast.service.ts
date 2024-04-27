import { Injectable, inject } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { OverlayEventDetail } from '@models/ionic.models';
import { Observable, from, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastControl = inject(ToastController);

  open$(options: ToastOptions): Observable<HTMLIonToastElement> {
    return from(this.toastControl.create(options)).pipe(
      tap((toastElement: HTMLIonToastElement) => toastElement.present()),
    );
  }

  openWithListener$<T>(options: ToastOptions): Observable<OverlayEventDetail<T>> {
    return this.open$(options).pipe(switchMap((toastCtrl: HTMLIonToastElement) => toastCtrl.onDidDismiss()));
  }
}
