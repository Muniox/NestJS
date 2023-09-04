import { AddItemDto } from './dto/add-item.dto';
import { BasketService } from './basket.service';
import { AddToBasketResponse, RemoveFromBasketResponse, GetBasketResponse, GetTotalBasketPriceResponse, GetBasketStatsResponse } from 'src/interfaces/basket';
export declare class BasketController {
    private basketService;
    constructor(basketService: BasketService);
    addProductToBasket(item: AddItemDto): Promise<AddToBasketResponse>;
    clearBasket(userId: string): Promise<void>;
    removeProduct(itemInBasketId: string, userId: string): Promise<RemoveFromBasketResponse>;
    getBasketForAdmin(): Promise<GetBasketResponse>;
    getStats(): Promise<GetBasketStatsResponse>;
    getBasket(userId: string): Promise<GetBasketResponse>;
    getTotalBasketPrice(userId: string): Promise<GetTotalBasketPriceResponse>;
}
