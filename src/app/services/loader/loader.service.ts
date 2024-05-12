import { Injectable, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { switchWith } from '@tools/rxjs/switch-with.operator';
import { Observable, exhaustMap, finalize, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly loadingController = inject(LoadingController);

  showUntilCompleted$<T>(obs$: Observable<T>, message?: string): Observable<T> {
    const loadingCtrl$ = from(
      this.loadingController.create({
        spinner: 'bubbles',
        message,
      }),
    );

    return loadingCtrl$.pipe(
      switchWith((loader: HTMLIonLoadingElement) => from(loader.present())),
      exhaustMap(([loader]: [HTMLIonLoadingElement, void]) => obs$.pipe(finalize(() => loader.dismiss()))),
    );
  }
}
