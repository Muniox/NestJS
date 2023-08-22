import { AddProductDto } from './dto/add-product.dto';
import { AddProductToBasketResponse, GetTotalPriceResponse, ListProductsInBasketResponse, RemoveProductFromBasketResponse } from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';
export declare class BasketService {
    private shopService;
    private items;
    constructor(shopService: ShopService);
    add(item: AddProductDto): AddProductToBasketResponse;
    remove(index: number): RemoveProductFromBasketResponse;
    list(): ListProductsInBasketResponse;
    getTotalPrice(): Promise<GetTotalPriceResponse>;
    countPromo(): Promise<number>;
}
