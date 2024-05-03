import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import { AppComponent } from './app.component';

jest.mock('@capacitor/app', () => {
  const actual = jest.requireActual('@capacitor/app');

  return {
    ...actual,
    App: {
      addListener: jest
        .fn()
        .mockImplementationOnce((_, fn) => fn({ url: '' }))
        .mockImplementationOnce((_, fn) => fn({ url: '' }))
        .mockImplementationOnce((_, fn) => fn({ url: 'collectihub.com/testUrl' }))
        .mockImplementationOnce((_, fn) => fn({ url: 'collectihub.com' }))
        .mockImplementation((_, fn) => fn({})),
    },
  };
});

describe('AppComponent', () => {
  let component: AppComponent;
  let ngZoneMock: MockProxy<NgZone>;
  let routerMock: MockProxy<Router>;

  beforeEach(() => {
    ngZoneMock = mock<NgZone>({ run: jest.fn(fn => fn()) as any });
    routerMock = mock<Router>();

    component = classWithProviders({
      token: AppComponent,
      providers: [
        {
          provide: NgZone,
          useValue: ngZoneMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
  });

  describe('deep links', () => {
    it('should trigger "addListener" method of "App" object', () => {
      const spy = jest.spyOn(App, 'addListener');

      expect(spy).toHaveBeenCalledWith('appUrlOpen', expect.any(Function));
    });

    it('should trigger "run" method of "ngZone" when deep link navigation triggered', () => {
      expect(ngZoneMock.run).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should navigate to specific link, when deep link received', () => {
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/testUrl');
    });

    it('should navigate to "not-found" page, when to specific link in deep link data', () => {
      jest
        .spyOn(App, 'addListener')
        .mockClear()
        .mockImplementationOnce((_, fn) => fn({ url: 'collectihub.com/testUrl' } as any) as any);

      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/not-found');
    });
  });
});
