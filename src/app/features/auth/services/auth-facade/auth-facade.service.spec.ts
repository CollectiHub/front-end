import { AppConstants } from '@constants/app.constants';
import { GenericApiResponse } from '@models/api.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { LoaderService } from '@services/loader/loader.service';
import { StorageService } from '@services/storage/storage.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of, take } from 'rxjs';

import { AuthApiService } from '../auth-api/auth-api.service';

import { AuthFacadeService } from './auth-facade.service';

describe(AuthFacadeService.name, () => {
  let service: AuthFacadeService;
  let storageServiceMock: MockProxy<StorageService>;
  let authApiServiceMock: MockProxy<AuthApiService>;
  let loaderServiceMock: MockProxy<LoaderService>;

  beforeEach(() => {
    storageServiceMock = mock<StorageService>();
    storageServiceMock.remove$.mockReturnValue(of(undefined));

    authApiServiceMock = mock<AuthApiService>();
    authApiServiceMock.logout$.mockReturnValue(of({} as GenericApiResponse));

    loaderServiceMock = mock<LoaderService>();
    loaderServiceMock.showUntilCompleted$.mockImplementation(obs$ => obs$);

    service = classWithProviders({
      token: AuthFacadeService,
      providers: [
        {
          provide: StorageService,
          useValue: storageServiceMock,
        },
        {
          provide: AuthApiService,
          useValue: authApiServiceMock,
        },
        {
          provide: LoaderService,
          useValue: loaderServiceMock,
        },
      ],
    });
  });

  it('should trigger "remove$" method of storageService', () => {
    service.logout$().pipe(take(1)).subscribe;

    expect(storageServiceMock.remove$).toHaveBeenCalledWith(AppConstants.tokenStorageKey);
  });

  it('should trigger "logout$" method of authApiService', () => {
    service.logout$().pipe(take(1)).subscribe;

    expect(authApiServiceMock.logout$).toHaveBeenCalledTimes(1);
  });

  it('should display loader', () => {
    service.logout$().pipe(take(1)).subscribe;

    expect(loaderServiceMock.showUntilCompleted$).toHaveBeenCalledTimes(1);
  });
});
