import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthConstants } from '@features/auth/auth.constants';
import { LoaderService } from '@services/loader/loader.service';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const skipLoading = req.context.get(AuthConstants.skipLoadingToken);

  return skipLoading ? next(req) : inject(LoaderService).showUntilCompleted$(next(req));
};
