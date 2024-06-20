import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { CollectionSettingsComponent } from './collection-settings.component';

describe(CollectionSettingsComponent.name, () => {
  let component: CollectionSettingsComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: CollectionSettingsComponent,
      providers: [],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
