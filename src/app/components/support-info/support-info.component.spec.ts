import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { SupportInfoComponent } from './support-info.component';

describe(SupportInfoComponent.name, () => {
  let component: SupportInfoComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: SupportInfoComponent,
      providers: [],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
