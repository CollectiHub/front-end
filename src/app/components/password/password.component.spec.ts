import { NgControl } from '@angular/forms';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import { PasswordComponent } from './password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let ngControlMock: MockProxy<NgControl>;

  beforeEach(() => {
    ngControlMock = mock<NgControl>();

    component = classWithProviders({
      token: PasswordComponent,
      providers: [
        {
          provide: NgControl,
          useValue: ngControlMock,
        },
      ],
    });
  });

  describe('toggleReveal', () => {
    it('should trigger "set" method of signal with oposite value', () => {
      const spy = jest.spyOn(component.isRevealed, 'set');

      component.toggleReveal();

      expect(spy).toHaveBeenCalledWith(true);
    });
  });
});
