import { AddItemDto } from './dto/add-item.dto';
import { AddToBasketResponse, GetBasketStatsResponse, GetTotalBasketPriceResponse, RemoveFromBasketResponse } from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { ItemInBasket } from './item-in-basket.entity';
import { UserService } from '../user/user.service';
import { DataSource } from 'typeorm';
import { MailService } from '../mail/mail.service';
export declare class BasketService {
    private shopService;
    private userService;
    private mailService;
    private readonly dataSource;
    constructor(shopService: ShopService, userService: UserService, mailService: MailService, dataSource: DataSource);
    add(product: AddItemDto): Promise<AddToBasketResponse>;
    remove(itemInBasketId: string, userId: string): Promise<RemoveFromBasketResponse>;
    getAllForUser(userId: string): Promise<ItemInBasket[]>;
    clearBasket(userId: string): Promise<void>;
    getTotalPrice(userId: string): Promise<GetTotalBasketPriceResponse>;
    getAllForAdmin(): Promise<ItemInBasket[]>;
    getStats(): Promise<GetBasketStatsResponse>;
}
