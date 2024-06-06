import { Injectable, inject } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular/standalone';
import { Observable, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly modalController = inject(ModalController);

  open$(options: ModalOptions): Observable<HTMLIonModalElement> {
    return from(this.modalController.create(options)).pipe(
      tap((modalElement: HTMLIonModalElement) => modalElement.present()),
    );
  }
}
