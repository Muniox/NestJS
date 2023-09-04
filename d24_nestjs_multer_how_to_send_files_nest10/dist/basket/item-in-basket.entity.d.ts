import { BaseEntity } from 'typeorm';
import { ShopItem } from '../shop/shop-item.entity';
import { User } from '../user/user.entity';
export declare class ItemInBasket extends BaseEntity {
    id: string;
    count: number;
    shopItem: ShopItem;
    user: User;
}
