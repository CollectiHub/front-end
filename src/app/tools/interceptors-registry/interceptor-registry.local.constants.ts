import { authMockIntrceptor } from '@mocks/auth-mock-interceptor/auth-mock.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error.interceptor';

export namespace MockInterceptorRegistry {
  export const getInterceptors = () => [httpErrorInterceptor, authMockIntrceptor];
}
