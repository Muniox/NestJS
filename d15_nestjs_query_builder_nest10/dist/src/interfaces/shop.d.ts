export interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
}
export type GetListOfProductsResponse = ShopItem[];
export interface ShopItemInterface {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
}
export type GetOneProductResponse = ShopItem;
export type CreateProductResponse = ShopItem;
export interface GetPaginatedListOfProductsResponse {
    items: ShopItem[];
    pagesCount: number;
}
