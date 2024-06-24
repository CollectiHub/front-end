import { signal } from '@angular/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { CollectionProgressMode } from '../collection-settings.models';

import CollectionProgressSettingsComponent from './collection-progress-setting.component';

describe(CollectionProgressSettingsComponent.name, () => {
  let component: CollectionProgressSettingsComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: CollectionProgressSettingsComponent,
      providers: [],
    });
  });

  describe('handleProgressModeChange', () => {
    it('should not emit "progressModeChange" output if progress mode was not changed', () => {
      const spy = jest.spyOn(component.progressModeChange, 'emit');
      component.selectedMode = signal(CollectionProgressMode.Numbers) as any;

      component.handleProgressModeChange(CollectionProgressMode.Numbers);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should emit "progressModeChange" output if progress mode was changed', () => {
      const spy = jest.spyOn(component.progressModeChange, 'emit');
      component.selectedMode = signal(CollectionProgressMode.Numbers) as any;

      component.handleProgressModeChange(CollectionProgressMode.None);

      expect(spy).toHaveBeenCalledWith(CollectionProgressMode.None);
    });
  });
});
