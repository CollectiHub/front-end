import { authInterceptor } from '@features/auth/interceptors/auth.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error.interceptor';

export namespace MockInterceptorRegistry {
  export const getInterceptors = () => [httpErrorInterceptor, authInterceptor];
}
