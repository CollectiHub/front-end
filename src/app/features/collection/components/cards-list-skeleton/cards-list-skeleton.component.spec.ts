import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { CardsListSkeletonComponent } from './cards-list-skeleton.component';

describe(CardsListSkeletonComponent.name, () => {
  let component: CardsListSkeletonComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: CardsListSkeletonComponent,
      providers: [],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
