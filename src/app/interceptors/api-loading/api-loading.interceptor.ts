import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@environments/environment';
import { LoaderService } from '@services/loader/loader.service';

export const apiLoadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loaderService = inject(LoaderService);

  return req.url.includes(environment.endpoints.apiUrl) ? loaderService.showUntilCompleted$(next(req)) : next(req);
};
