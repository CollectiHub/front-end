import { Injectable, InjectionToken, inject } from '@angular/core';
import { Clipboard, ClipboardPlugin, ReadResult, WriteOptions } from '@capacitor/clipboard';
import { Observable, from } from 'rxjs';

export const CLIPBOARD_PLUGIN_TOKEN = new InjectionToken<ClipboardPlugin>('ClipboardPluginToken', {
  providedIn: 'root',
  factory: () => Clipboard,
});

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  private readonly clipboard = inject(CLIPBOARD_PLUGIN_TOKEN);

  write$(options: WriteOptions): Observable<void> {
    return from(this.clipboard.write(options));
  }

  read$(): Observable<ReadResult> {
    return from(this.clipboard.read());
  }
}
