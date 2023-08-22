import { CreateProductResponse, GetListOfProductsResponse, GetOneProductResponse, GetPaginatedListOfProductsResponse } from '../interfaces/shop';
import { ShopService } from './shop.service';
export declare class ShopController {
    private shopService;
    onApplicationBootstrap(): void;
    onApplicationShutdown(): void;
    constructor(shopService: ShopService);
    getListOfProducts(pageNumber: number): Promise<GetPaginatedListOfProductsResponse>;
    testFindItem(searchTerm: string): Promise<GetListOfProductsResponse>;
    welcome(siteName: string): string;
    getOneProduct(id: string): Promise<GetOneProductResponse>;
    removeProduct(id: string): Promise<void>;
    createNewProduct(): Promise<CreateProductResponse>;
}
