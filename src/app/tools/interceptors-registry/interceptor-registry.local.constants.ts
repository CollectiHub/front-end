import { authMockIntrceptor } from '@mocks/auth-mock-interceptor/auth-mock.interceptor';

export namespace MockInterceptorRegistry {
  export const getInterceptors = () => [authMockIntrceptor];
}
