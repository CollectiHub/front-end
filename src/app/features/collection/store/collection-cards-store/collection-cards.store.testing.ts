export interface CollectionCardsStoreMock {
  cardsByRarity: jest.Mock;
  fetchByRarity: jest.Mock;
  update: jest.Mock;
  entities: jest.Mock;
  error: jest.Mock;
  loading: jest.Mock;
  cardsLoadingMap: jest.Mock;
}
