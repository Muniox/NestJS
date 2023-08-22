import { AddProductDto } from './dto/add-product.dto';
import { BasketService } from './basket.service';
import { AddProductToBasketResponse, RemoveProductFromBasketResponse, ListProductsInBasketResponse, GetTotalPriceResponse } from 'src/interfaces/basket';
export declare class BasketController {
    private basketService;
    constructor(basketService: BasketService);
    addProductToBasket(item: AddProductDto): AddProductToBasketResponse;
    removeProductFromBasket(index: number): RemoveProductFromBasketResponse;
    listProductsInBasket(): ListProductsInBasketResponse;
    totalPrice(): Promise<GetTotalPriceResponse>;
}
