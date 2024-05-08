import { authMockIntrceptor } from '@mocks/auth-mock-interceptor/auth-mock.interceptor';
import { usersMockInterceptor } from '@mocks/users-mock-interceptor/users-mock.interceptor';
import { apiLoadingInterceptor } from 'src/app/interceptors/api-loading/api-loading.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error/http-error.interceptor';
import { refreshTokenInterceptor } from 'src/app/interceptors/refresh-token/refresh-token.interceptor';

export namespace InterceptorsRegistry {
  export const getInterceptors = () => [
    httpErrorInterceptor,
    apiLoadingInterceptor,
    refreshTokenInterceptor,
    authMockIntrceptor,
    usersMockInterceptor,
  ];
}
