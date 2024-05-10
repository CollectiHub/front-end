import { authInterceptor } from '@features/auth/interceptors/auth.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error/http-error.interceptor';
import { loadingInterceptor } from 'src/app/interceptors/loading/loading.interceptor';
import { refreshTokenInterceptor } from 'src/app/interceptors/refresh-token/refresh-token.interceptor';

export namespace InterceptorsRegistry {
  export const getInterceptors = () => [
    httpErrorInterceptor,
    loadingInterceptor,
    authInterceptor,
    refreshTokenInterceptor,
  ];
}
