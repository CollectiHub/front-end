import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { CollectionFetchErrorComponent } from './collection-fetch-error.component';

describe(CollectionFetchErrorComponent.name, () => {
  let component: CollectionFetchErrorComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: CollectionFetchErrorComponent,
      providers: [],
    });
  });

  describe('onTryAgainClick', () => {
    it('should emit "tryAgainClicked" output event', () => {
      const spy = jest.spyOn(component.tryAgainClicked, 'emit');

      component.onTryAgainClick();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
