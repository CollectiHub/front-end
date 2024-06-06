export interface UsersStoreMock {
  setUserData: jest.Mock;
  setError: jest.Mock;
  updateUserData: jest.Mock;
  userData: jest.Mock;
  deleteUser: jest.Mock;
  logout: jest.Mock;
  setEmailVerified: jest.Mock;
}
