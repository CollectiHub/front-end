import { Injectable } from '@angular/core';
import { Clipboard, ReadResult, WriteOptions } from '@capacitor/clipboard';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  write$(options: WriteOptions): Observable<void> {
    return from(Clipboard.write(options));
  }

  read$(): Observable<ReadResult> {
    return from(Clipboard.read());
  }
}
