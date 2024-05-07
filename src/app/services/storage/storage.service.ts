import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable, filter, from, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage = inject(Storage);

  private _storage: Storage | null = null;
  private storageCreated$ = new BehaviorSubject<boolean>(false);

  constructor() {
    from(this.storage.create())
      .pipe(
        tap((storage: Storage) => {
          this._storage = storage;
        }),
        take(1),
      )
      .subscribe(() => this.storageCreated$.next(true));
  }

  set<T>(key: string, value: T): void {
    this._storage?.set(key, value);
  }

  get$<T>(key: string): Observable<T> {
    return this.storageCreated$.pipe(
      filter(Boolean),
      switchMap(() => this._storage!.get(key)),
    );
  }

  remove$(key: string): Observable<void> {
    return from(this._storage!.remove(key));
  }
}
