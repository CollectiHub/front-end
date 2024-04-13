import { authMockIntrceptor } from '../auth-mock-interceptor/auth-mock.interceptor';

export namespace MockInterceptorRegistry {
  export const getMockInterceptors = () => [authMockIntrceptor];
}
