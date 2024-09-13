import { ProgressBarComponent } from '@features/collection/components/progress-bar/progress-bar.component';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { ProgressBarSkeletonComponent } from './progress-bar-skeleton.component';

describe(ProgressBarSkeletonComponent.name, () => {
  let component: ProgressBarSkeletonComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: ProgressBarComponent,
      providers: [],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
