import { Injectable, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';
import { switchWith } from '@tools/rxjs/switch-with.operator';
import { Observable, ObservableInput, finalize, from, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly loadingController = inject(LoadingController);

  private requestsCounts = 0;
  private existingLoaderRef?: HTMLIonLoadingElement;

  showUntilCompleted$<T>(obs$: Observable<T>, message?: string): Observable<T> {
    this.requestsCounts += 1;

    const isFirstRequest = this.requestsCounts === 1;
    const initialAction$: Observable<undefined | [HTMLIonLoadingElement, void]> = isFirstRequest
      ? this.initLoader$(message)
      : of(undefined);

    return initialAction$.pipe(
      switchMap<[HTMLIonLoadingElement, void] | undefined, ObservableInput<T>>(() => obs$),
      finalize(() => {
        this.requestsCounts -= 1;

        if (this.requestsCounts > 0) return;

        void this.existingLoaderRef!.dismiss();
      }),
    );
  }

  private initLoader$(message?: string) {
    return from(
      this.loadingController.create({
        spinner: 'bubbles',
        message,
      }),
    ).pipe(
      switchWith((loader: HTMLIonLoadingElement) => from(loader.present())),
      tap(([loader]) => {
        this.existingLoaderRef = loader;
      }),
    );
  }
}
