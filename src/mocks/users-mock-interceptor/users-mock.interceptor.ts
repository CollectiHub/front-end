import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MockInterceptorRegistryService } from '../mock-interceptor-registry/mock-interceptor-registry.service';
export const usersMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.get(environment.endpoints.users.getUserData, () => {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          data: {
            email: 'realhokage@gmail.com',
            id: '3c1e3b82-3a29-4cc0-a4b2-4e7c4ac58052',
            role: 'regular',
            username: 'realhokage',
            verified: true,
          },
          message: 'Success!',
        },
      }),
    );
  });

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

  registry.post(environment.endpoints.users.requestPasswordReset, req => {
    const email = (req.body as Record<string, string>)['email'];

    if (email === 'requestPasswordError@gg.gg') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              error: 'Request reset password error',
              errors: [
                {
                  detail: 'Request reset password error',
                  field: 'Reset password',
                },
              ],
              message: 'Unexpected database error',
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

  registry.post(environment.endpoints.users.verifyPasswordReset, req => {
    const code = (req.body as Record<string, string>)['code'];

    if (code === 'verifyPasswordCode123123123') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              error: 'Verify reset password error',
              errors: [
                {
                  detail: 'Verify reset password error',
                  field: 'Verify password',
                },
              ],
              message: 'Unexpected database error',
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
