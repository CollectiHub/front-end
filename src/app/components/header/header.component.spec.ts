import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { HeaderComponent } from './header.component';

describe(HeaderComponent.name, () => {
  let component: HeaderComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: HeaderComponent,
      providers: [],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
