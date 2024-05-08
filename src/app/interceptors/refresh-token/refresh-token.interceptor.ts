import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '@constants/app.constants';
import { environment } from '@environments/environment';
import { AuthApiService } from '@features/auth/services/auth-api.service';
import { StorageService } from '@services/storage/storage.service';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const storageService = inject(StorageService);
  const authApiService = inject(AuthApiService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (req.url.includes(environment.endpoints.auth.refreshToken)) {
        return authApiService.logout$().pipe(
          switchMap(() => storageService.remove$(AppConstants.tokenStorageKey)),
          tap(() => router.navigate(['/'])),
        );
      }

      if (error.status === HttpStatusCode.Unauthorized) {
        return authApiService.refreshToken$().pipe(
          tap((refreshedToken: string) => storageService.set(AppConstants.tokenStorageKey, refreshedToken)),
          switchMap((refreshedToken: string) =>
            next(
              req.clone({
                headers: req.headers.set('Authorization', `Bearer ${refreshedToken}`),
              }),
            ),
          ),
        );
      }

      return throwError(() => error);
    }),
  ) as Observable<HttpEvent<unknown>>;
};
