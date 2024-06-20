import { fakeAsync, tick } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular/standalone';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { Subscription, delay, of, take } from 'rxjs';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;
  let loadingControllerMock: LoadingController;

  let createFunctionSpy: jest.Mock;
  let presentFunctionMock: jest.Mock;
  let dismissFunctionMock: jest.Mock;

  beforeEach(() => {
    createFunctionSpy = jest.fn();
    presentFunctionMock = jest.fn();
    dismissFunctionMock = jest.fn();

    loadingControllerMock = {
      create: createFunctionSpy.mockImplementation(function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Promise.resolve(this);
      }),
      present: presentFunctionMock.mockImplementation(function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Promise.resolve(this);
      }),
      dismiss: dismissFunctionMock.mockImplementation(function () {
        return Promise.resolve();
      }),
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should present loader only one time if user send few reuqess in sequence', fakeAsync(() => {
    const sub = new Subscription();

    sub.add(service.showUntilCompleted$(of(undefined)).pipe(delay(10), take(1)).subscribe());
    sub.add(service.showUntilCompleted$(of(undefined)).pipe(delay(20), take(1)).subscribe());
    sub.add(service.showUntilCompleted$(of(undefined)).pipe(delay(30), take(1)).subscribe());
    tick(30);

    expect(presentFunctionMock).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  }));

  it('should create loader only one time, if send few requests in sequence, with first passed message', fakeAsync(() => {
    const sub = new Subscription();

    sub.add(service.showUntilCompleted$(of(undefined), 'message1').pipe(delay(10), take(1)).subscribe());
    sub.add(service.showUntilCompleted$(of(undefined), 'message2').pipe(delay(20), take(1)).subscribe());
    tick(20);

    expect(createFunctionSpy).toHaveBeenCalledTimes(1);
    expect(createFunctionSpy).toHaveBeenCalledWith({ spinner: 'bubbles', message: 'message1' });
    sub.unsubscribe();
  }));

  it('should dismiss loader only once, if few requests were completed in a sequence', fakeAsync(() => {
    const sub = new Subscription();

    sub.add(service.showUntilCompleted$(of(undefined), 'message1').pipe(delay(10), take(1)).subscribe());
    sub.add(service.showUntilCompleted$(of(undefined), 'message2').pipe(delay(20), take(1)).subscribe());
    tick(20);

    expect(dismissFunctionMock).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  }));

  it('should emit passed observable value', fakeAsync(() => {
    const spy = jest.fn();
    const sub = new Subscription();

    sub.add(service.showUntilCompleted$(of('result')).pipe(take(1)).subscribe(spy));
    tick();

    expect(spy).toHaveBeenCalledWith('result');
    sub.unsubscribe;
  }));
});
