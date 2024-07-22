import { SearchbarCustomEvent } from '@ionic/angular/standalone';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { SearchBarComponent } from './search-bar.component';

describe(SearchBarComponent.name, () => {
  let component: SearchBarComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: SearchBarComponent,
      providers: [],
    });
  });

  describe('handleSearchInput', () => {
    it('should emit search value', () => {
      const testValue = 'RR';
      const eventMock = { target: { value: testValue } } as SearchbarCustomEvent;
      const spy = jest.spyOn(component.searchInput, 'emit');

      component.handleSearchInput(eventMock);

      expect(spy).toHaveBeenCalledWith(testValue);
    });

    it('should emit trimmed search value', () => {
      const testValue = '  RR  ';
      const trimmedTestValue = testValue.trim();
      const eventMock = { target: { value: testValue } } as SearchbarCustomEvent;
      const spy = jest.spyOn(component.searchInput, 'emit');

      component.handleSearchInput(eventMock);

      expect(spy).toHaveBeenCalledWith(trimmedTestValue);
    });
  });

  describe('clearInput', () => {
    it('should trigger "reset" method of formCotrol', () => {
      const spy = jest.spyOn(component.control, 'reset');

      component.clearInput();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit empty string', () => {
      const testValue = '';
      const spy = jest.spyOn(component.searchInput, 'emit');

      component.clearInput();

      expect(spy).toHaveBeenCalledWith(testValue);
    });
  });
});
