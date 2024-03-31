import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { SelectLanguageComponent } from './select-language.component';

describe('SelectLanguageComponent', () => {
  let component: SelectLanguageComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: SelectLanguageComponent,
      providers: [],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
