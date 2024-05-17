import { NonNullableFormBuilder } from '@angular/forms';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import EditProfileViewComponent from './edit-profile-view.component';

describe(EditProfileViewComponent.name, () => {
  let component: EditProfileViewComponent;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;

  beforeEach(() => {
    formBuilderMock = mock<NonNullableFormBuilder>();

    component = classWithProviders({
      token: EditProfileViewComponent,
      providers: [
        {
          provide: NonNullableFormBuilder,
          useValue: formBuilderMock,
        },
      ],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
