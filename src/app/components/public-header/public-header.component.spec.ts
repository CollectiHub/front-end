import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { PublicHeaderComponent } from './public-header.component';

describe('PublicHeaderComponent', () => {
  let component: PublicHeaderComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: PublicHeaderComponent,
      providers: [],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
