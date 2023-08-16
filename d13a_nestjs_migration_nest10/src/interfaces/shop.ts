export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type GetListOfProductsResponse = ShopItem[];

//jeśli implementujemy w repository ten interfejs, to nie musimy już w encji
export interface ShopItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

export type GetOneProductResponse = ShopItem;

export type CreateProductResponse = ShopItem;
