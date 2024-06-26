import { NgControl } from '@angular/forms';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import { EmailComponent } from './email.component';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let ngControlMock: MockProxy<NgControl>;

  beforeEach(() => {
    ngControlMock = mock<NgControl>();

    component = classWithProviders({
      token: EmailComponent,
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
