import HomePage from './home.page';

describe('HomeComponent', () => {
  let component: HomePage;

  beforeEach(() => {
    component = new HomePage();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
