export interface ShopItem {
  name: string;
  description: string;
  price: number;
}

export type GetListOfProductsResponse = ShopItem[];

//jeśli implementujemy tutaj, to nie musimy już w encji
export interface ShopItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}
