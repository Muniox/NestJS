import { BasketService } from '../basket/basket.service';
import { GetListOfProductsResponse, GetOneProductResponse, GetPaginatedListOfProductsResponse } from '../interfaces/shop';
import { ShopItem } from './shop-item.entity';
import { DataSource } from 'typeorm';
export declare class ShopService {
    private basketService;
    private readonly dataSource;
    constructor(basketService: BasketService, dataSource: DataSource);
    getProducts(pageNumber?: number): Promise<GetPaginatedListOfProductsResponse>;
    hasProduct(name: string): Promise<boolean>;
    getPriceOfProduct(name: string): Promise<number>;
    getOneProduct(id: string): Promise<GetOneProductResponse>;
    removeProduct(id: string): Promise<void>;
    createDummyProduct(): Promise<ShopItem>;
    addBoughtCounter(id: string): Promise<void>;
    findProducts(searchTerm: string): Promise<GetListOfProductsResponse>;
}
