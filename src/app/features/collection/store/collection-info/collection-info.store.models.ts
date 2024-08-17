export interface CollectionInfoState {
  error: string | undefined;
  loading: boolean;
  cards_collected: number | undefined;
  cards_total: number | undefined;
  rarities: string[] | undefined;
}
