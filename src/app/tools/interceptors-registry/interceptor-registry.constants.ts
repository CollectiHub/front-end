import { authInterceptor } from '@features/auth/interceptors/auth.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error/http-error.interceptor';
import { loadingInterceptor } from 'src/app/interceptors/loading/loading.interceptor';

export namespace MockInterceptorRegistry {
  export const getInterceptors = () => [httpErrorInterceptor, loadingInterceptor, authInterceptor];
}
