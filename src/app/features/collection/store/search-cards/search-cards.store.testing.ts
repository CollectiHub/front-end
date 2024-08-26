export interface SearchCardsStoreMock {
  clearSearchCards: jest.Mock;
  entities: jest.Mock;
  update: jest.Mock;
  search: jest.Mock;
  error: jest.Mock;
  loading: jest.Mock;
}
