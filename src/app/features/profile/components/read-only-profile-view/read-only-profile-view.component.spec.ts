import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import ReadOnlyProfileViewComponent from './read-only-profile-view.component';

describe('ReadOnlyProfileViewComponent', () => {
  let component: ReadOnlyProfileViewComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: ReadOnlyProfileViewComponent,
      providers: [],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
