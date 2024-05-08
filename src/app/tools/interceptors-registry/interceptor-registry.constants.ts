import { authInterceptor } from '@features/auth/interceptors/auth.interceptor';
import { apiLoadingInterceptor } from 'src/app/interceptors/api-loading/api-loading.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error/http-error.interceptor';
import { refreshTokenInterceptor } from 'src/app/interceptors/refresh-token/refresh-token.interceptor';

export namespace InterceptorsRegistry {
  export const getInterceptors = () => [
    httpErrorInterceptor,
    apiLoadingInterceptor,
    authInterceptor,
    refreshTokenInterceptor,
  ];
}
