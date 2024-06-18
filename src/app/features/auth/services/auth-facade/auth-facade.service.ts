import { Injectable, inject } from '@angular/core';
import { AppConstants } from '@constants/app.constants';
import { GenericApiResponse } from '@models/api.models';
import { LoaderService } from '@services/loader/loader.service';
import { StorageService } from '@services/storage/storage.service';
import { Observable, forkJoin, take } from 'rxjs';

import { AuthApiService } from '../auth-api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  private readonly storageService = inject(StorageService);
  private readonly authApiService = inject(AuthApiService);
  private readonly loaderService = inject(LoaderService);

  logout$(): Observable<[GenericApiResponse, void]> {
    const localCleanup$: Observable<void> = this.storageService.remove$(AppConstants.tokenStorageKey).pipe(take(1));
    const apiLogout$ = this.authApiService.logout$();

    const stream$ = forkJoin([apiLogout$, localCleanup$]);

    return this.loaderService.showUntilCompleted$(stream$);
  }
}
