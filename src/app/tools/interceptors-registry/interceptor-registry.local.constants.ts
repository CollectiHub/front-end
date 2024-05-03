import { authMockIntrceptor } from '@mocks/auth-mock-interceptor/auth-mock.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error/http-error.interceptor';
import { loadingInterceptor } from 'src/app/interceptors/loading/loading.interceptor';

export namespace MockInterceptorRegistry {
  export const getInterceptors = () => [httpErrorInterceptor, loadingInterceptor, authMockIntrceptor];
}
