import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MockInterceptorRegistryService } from '../mock-interceptor-registry/mock-interceptor-registry.service';
export const usersMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.post(environment.endpoints.users.verifyEmail, req => {
    const code = (req.body as Record<string, string>)['code'];

    if (code === 'useralreadyverified123123123') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              error: 'Verify email error',
              errors: [
                {
                  detail: 'Verify email error',
                  field: 'Verify email',
                },
              ],
              message: 'User already verified',
            },
          }),
      );
    }

    return of(
      new HttpResponse({
        status: 200,
        body: {
          data: 'data',
          message: 'Success!',
        },
      }),
    );
  });

  return registry.processRequest$(req, next);
};
