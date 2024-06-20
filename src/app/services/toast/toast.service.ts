import { Injectable, inject } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular/standalone';
import { Observable, from, tap } from 'rxjs';

import { ToastColor } from './toast.models';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly baseToastConfig: ToastOptions = {
    duration: 3000,
    cssClass: 'app-toast',
    position: 'bottom',
    buttons: [{ icon: 'close-outline', role: 'cancel' }],
  };

  private readonly toastControl = inject(ToastController);

  open$(message: string, color: ToastColor): Observable<HTMLIonToastElement> {
    return from(this.toastControl.create({ ...this.baseToastConfig, message, color })).pipe(
      tap((toastElement: HTMLIonToastElement) => toastElement.present()),
    );
  }
}
