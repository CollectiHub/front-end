import ProfilePage from './profile.page';

describe(ProfilePage.name, () => {
  let component: ProfilePage;

  beforeEach(() => {
    component = new ProfilePage();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
