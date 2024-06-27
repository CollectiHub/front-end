import { NgControl } from '@angular/forms';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import { EmailComponent } from './email.component';

describe(EmailComponent.name, () => {
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

  describe('getErrorText', () => {
    it('should return "validation.required" text if such error in form control', () => {
      const result = component.getErrorText({ required: true });

      expect(result).toBe('validation.required');
    });

    it('should return "validation.invalid_email" text if control error is not required', () => {
      const result = component.getErrorText({ noRequired: true });

      expect(result).toBe('validation.invalid_email');
    });
  });
});
