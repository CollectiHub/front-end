import { NonNullableFormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import EditUserDataPage from './edit-user-data.page';

describe(EditUserDataPage.name, () => {
  let component: EditUserDataPage;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;
  let navControllerMock: MockProxy<NavController>;

  beforeEach(() => {
    formBuilderMock = mock<NonNullableFormBuilder>();
    navControllerMock = mock<NavController>();

    component = classWithProviders({
      token: EditUserDataPage,
      providers: [
        {
          provide: NonNullableFormBuilder,
          useValue: formBuilderMock,
        },
        {
          provide: NavController,
          useValue: navControllerMock,
        },
      ],
    });
  });

  describe('getEmailError', () => {
    it('should return "validation.required" text if such error in form control', () => {
      const result = component.getEmailError({ required: true });

      expect(result).toBe('validation.required');
    });

    it('should return "validation.invalid_email" text if control error is not required', () => {
      const result = component.getEmailError({ noRequired: true });

      expect(result).toBe('validation.invalid_email');
    });
  });

  describe('goToProfile', () => {
    it('should trigger "navigateBack" when called', () => {
      component.goToProfile();

      expect(navControllerMock.navigateBack).toHaveBeenCalledWith('/profile');
    });
  });
});
