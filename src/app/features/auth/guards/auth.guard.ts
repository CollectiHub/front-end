import { inject } from '@angular/core';
import { CanMatchFn, UrlTree } from '@angular/router';
import { AppConstants } from '@constants/app.constants';
import { StorageService } from '@services/storage/storage.service';
import { Observable, map, take } from 'rxjs';

export const authGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  return inject(StorageService).get$<string>(AppConstants.tokenStorageKey).pipe(take(1), map(Boolean));
};
