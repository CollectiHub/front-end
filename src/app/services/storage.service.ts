import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage = inject(Storage);

  private _storage: Storage | null = null;

  constructor() {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  set<T>(key: string, value: T): void {
    this._storage?.set(key, value);
  }

  get$<T>(key: string): Observable<T> {
    return from(this._storage!.get(key));
  }
}
