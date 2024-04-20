import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppConstants } from '@constants/app.constants';
import { StorageService } from '@services/storage-service/storage.service';
import { Observable, switchMap, take } from 'rxjs';

import { AuthConstants } from '../auth.constants';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return inject(StorageService)
    .get$<string>(AppConstants.tokenStorageKey)
    .pipe(
      take(1),
      switchMap((token: string) => {
        const skipAuth = req.context.get(AuthConstants.skipAuthContextToken);
        const initialRequestClone = req.clone({
          withCredentials: !skipAuth,
        });
        let headers = initialRequestClone.headers;

        if (!token || skipAuth) return next(initialRequestClone);

        headers = headers.set('Authorization', `Bearer ${token}`);

        const requestWithCredentials = initialRequestClone.clone({ headers });

        return next(requestWithCredentials);
      }),
    );
};
