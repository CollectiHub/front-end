import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MockInterceptorRegistryService } from '../mock-interceptor-registry/mock-interceptor-registry.service';
export const authMockIntrceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.post(environment.endpoints.auth.login, req => {
    const email = (req.body as Record<string, string>)['email'];

    if (email === 'login400Error@g.gg') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              error: 'Login error',
              errors: [
                {
                  detail: 'Login error',
                  field: 'Email',
                },
              ],
              message: 'Error received during login',
            },
          }),
      );
    }

    return of(
      new HttpResponse({
        status: 200,
        body: {
          data: {
            access_token: 'accessToken',
          },
          message: 'Success!',
        },
      }),
    );
  });

  registry.post(environment.endpoints.auth.logout, () => {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          data: 'string',
          message: 'Success!',
        },
      }),
    );
  });

  registry.post(environment.endpoints.auth.refreshToken, () => {
    const shouldThrowError = false;

    if (shouldThrowError) {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              error: 'Error while refreshing token',
              errors: [
                {
                  detail: 'Detail 1',
                  field: 'detail',
                },
              ],
              message: 'Token refresh error',
            },
          }),
      );
    }

    return of(
      new HttpResponse({
        status: 200,
        body: {
          data: {
            access_token: 'new token',
          },
          message: 'Success!',
        },
      }),
    );
  });

  registry.post(environment.endpoints.auth.register, req => {
    const email = (req.body as Record<string, string>)['email'];

    if (email === 'register400Error@g.gg') {
      return throwError(() => {
        return new HttpErrorResponse({
          status: 400,
          error: {
            error: 'Registration error',
            errors: [
              {
                detail: 'Registration error',
                field: 'Email',
              },
            ],
            message: 'Error received during registration',
          },
        });
      });
    }

    return of(
      new HttpResponse({
        status: 201,
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

  return registry.processRequest$(req, next);
};
