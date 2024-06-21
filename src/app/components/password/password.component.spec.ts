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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
