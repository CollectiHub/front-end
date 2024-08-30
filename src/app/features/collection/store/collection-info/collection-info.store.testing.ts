export interface CollectionInfoStoreMock {
  getCollectionInfo: jest.Mock;
  updateCardsCollected: jest.Mock;
  error: jest.Mock;
  loading: jest.Mock;
  cards_collected: jest.Mock;
  cards_total: jest.Mock;
  rarities: jest.Mock;
}
