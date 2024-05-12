import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, delay } from 'rxjs';

import { EndpointMock, HttpMethod, MockCallback } from './mock-interceptor-registry.models';

export class MockInterceptorRegistryService {
  private registry: Record<string, EndpointMock> = {};

  get = this.register(HttpMethod.Get);
  post = this.register(HttpMethod.Post);
  put = this.register(HttpMethod.Put);
  patch = this.register(HttpMethod.Patch);
  delete = this.register(HttpMethod.Delete);

  register(method: HttpMethod) {
    return (url: string, callback: MockCallback): void => {
      if (!this.registry[url]) {
        this.registry[url] = {} as EndpointMock;
      }
      this.registry[url][method] = callback;
    };
  }

  processRequest$(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
  ): Observable<HttpResponse<unknown>> | Observable<HttpEvent<unknown>> {
    for (const patternUrl in this.registry) {
      const isMatch = this.isUrlMatch(req.url, patternUrl);

      if (isMatch) {
        const callback = this.registry[patternUrl][req.method as HttpMethod];

        if (callback && typeof callback === 'function') {
          const params = this.extractParamsFromUrl(patternUrl, req.url);
          const queryParams = this.extractQueryParams(req.url);
          return callback(req, params, queryParams);
        }
      }
    }

    return next(req).pipe(delay(300));
  }

  private isUrlMatch(url: string, pattern: string): boolean {
    const regex = new RegExp(`^${pattern.replace(/:\w+/g, '\\w+')}(\\?.*)?$`);
    return regex.test(url);
  }

  private extractQueryParams(url: string) {
    const queryParams: Record<string, string> = {};
    const [, queryString] = url.split('?');

    if (queryString) {
      const pairs = queryString.split('&');

      pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    }

    return queryParams;
  }

  private extractParamsFromUrl(patternUrl: string, requestUrl: string) {
    const regex = new RegExp(`${patternUrl.replace(/:\w+/g, '(\\w+)')}(\\?.*)?$`);
    const match = regex.exec(requestUrl);

    if (match) {
      const keys: string[] = patternUrl.match(/:\w+/g)?.map(param => param.substring(1)) ?? [];
      const params: Record<string, string> = {};

      for (let i = 0; i < keys.length; i++) {
        params[keys[i]] = match?.[i + 1];
      }

      return params;
    }
    return {};
  }
}
