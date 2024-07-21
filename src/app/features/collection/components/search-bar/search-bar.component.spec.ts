import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { SearchBarComponent } from './search-bar.component';

describe(SearchBarComponent.name, () => {
  let component: SearchBarComponent;

  beforeEach(async () => {
    component = classWithProviders({
      token: SearchBarComponent,
      providers: [],
    });
  });

  describe('clearInput', () => {
    it('should trigger "reset" method of formCotrol', () => {
      const spy = jest.spyOn(component.control, 'reset');

      component.clearInput();

      expect(spy).toHaveBeenCalled();
    });
  });
});
