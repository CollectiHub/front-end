import { authInterceptor } from '@features/auth/interceptors/auth.interceptor';

export namespace MockInterceptorRegistry {
  export const getInterceptors = () => [authInterceptor];
}
