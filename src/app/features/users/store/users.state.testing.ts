export interface UsersStoreMock {
  loadUserData: jest.Mock;
  updateUserData: jest.Mock;
  userData: jest.Mock;
  deleteUser: jest.Mock;
  logout: jest.Mock;
  setEmailVerified: jest.Mock;
}
