export interface ShopItemEntity {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type GetListOfProductsResponse = ShopItemEntity[];

//jeśli implementujemy w repository ten interfejs, to nie musimy już w encji
export interface ShopItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

export type GetOneProductResponse = ShopItemEntity;

export type CreateProductResponse = ShopItemEntity;

export interface GetPaginatedListOfProductsResponse {
  items: ShopItemEntity[];
  pagesCount: number;
}

export interface ShopItemInterface {
  name: string;
  description: string;
  price: number;
}
