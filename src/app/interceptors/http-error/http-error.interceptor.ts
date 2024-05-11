import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppConstants } from '@constants/app.constants';
import { ToastOptions } from '@ionic/angular';
import { ToastService } from '@services/toast/toast.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const toastOptions: ToastOptions = {
        message: error.error.message,
        duration: AppConstants.toastDuration,
        cssClass: 'app-toast',
        position: 'bottom',
        buttons: [{ icon: 'close-outline', role: 'cancel' }],
      };

      return toastService.open$(toastOptions).pipe(switchMap(() => throwError(() => error)));
    }),
  );
};
