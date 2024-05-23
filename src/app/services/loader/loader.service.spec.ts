import { fakeAsync, tick } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular/standalone';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { of, take } from 'rxjs';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;
  let loadingControllerMock: LoadingController;
  let crateFunctionSpy: jest.Mock;
  let presentFunctionMock: jest.Mock;
  let dismissFunctionMock: jest.Mock;

  beforeEach(() => {
    crateFunctionSpy = jest.fn();
    presentFunctionMock = jest.fn();
    dismissFunctionMock = jest.fn();

    loadingControllerMock = {
      create: crateFunctionSpy.mockImplementation(function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Promise.resolve(this);
      }),
      present: presentFunctionMock.mockImplementation(function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Promise.resolve(this);
      }),
      dismiss: dismissFunctionMock,
    } as any;

    service = classWithProviders({
      token: LoaderService,
      providers: [
        {
          provide: LoadingController,
          useValue: loadingControllerMock,
        },
      ],
    });
  });

  it('should create loader when triggered', fakeAsync(() => {
    service.showUntilCompleted$(of(undefined), 'message').pipe(take(1)).subscribe();

    tick();

    expect(crateFunctionSpy).toHaveBeenCalledWith({
      spinner: 'bubbles',
      message: 'message',
    });
  }));

  it('should present loader when triggered', fakeAsync(() => {
    service.showUntilCompleted$(of(undefined)).pipe(take(1)).subscribe();

    tick();

    expect(presentFunctionMock).toHaveBeenCalledTimes(1);
  }));

  it('should dismiss loader after observable completed', fakeAsync(() => {
    service.showUntilCompleted$(of(undefined)).pipe(take(1)).subscribe();

    tick();

    expect(dismissFunctionMock).toHaveBeenCalledTimes(1);
  }));
});
