export interface IGame {
  readonly name: string;
  readonly salePrice: number;
  readonly cheapestPrice: number;
  readonly releaseDate: Date;
}

export interface GameSearchParams {
  storeID: number;
  desc: number;
  pageSize: number;
}
