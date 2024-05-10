import { authMockIntrceptor } from '@mocks/auth-mock-interceptor/auth-mock.interceptor';
import { usersMockInterceptor } from '@mocks/users-mock-interceptor/users-mock.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error/http-error.interceptor';
import { loadingInterceptor } from 'src/app/interceptors/loading/loading.interceptor';
import { refreshTokenInterceptor } from 'src/app/interceptors/refresh-token/refresh-token.interceptor';

export namespace InterceptorsRegistry {
  export const getInterceptors = () => [
    httpErrorInterceptor,
    loadingInterceptor,
    refreshTokenInterceptor,
    authMockIntrceptor,
    usersMockInterceptor,
  ];
}
