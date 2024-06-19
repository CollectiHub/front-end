import { signal } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import { BackButtonComponent } from './back-button.component';

describe(BackButtonComponent.name, () => {
  let component: BackButtonComponent;
  let navControllerMock: MockProxy<NavController>;

  beforeEach(() => {
    navControllerMock = mock<NavController>();

    component = classWithProviders({
      token: BackButtonComponent,
      providers: [{ provide: NavController, useValue: navControllerMock }],
    });
  });

  describe('navigate', () => {
    it('should trigger "navigateBack" when called', () => {
      const testRoute: string = '/testRoute';

      component.routePath = signal(testRoute) as any;
      component.navigate();

      expect(navControllerMock.navigateBack).toHaveBeenCalledWith(testRoute);
    });
  });
});
