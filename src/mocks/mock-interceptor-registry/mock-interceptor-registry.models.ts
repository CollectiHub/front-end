import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export type MockCallback = (
  req: HttpRequest<unknown>,
  params: Record<string, string>,
  queryParams: Record<string, string>,
) => Observable<HttpResponse<unknown>>;

export type EndpointMock = Record<HttpMethod, MockCallback>;
