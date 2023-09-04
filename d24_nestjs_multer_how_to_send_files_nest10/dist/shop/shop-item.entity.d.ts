import { ShopItemInterface } from 'src/interfaces/shop';
import { BaseEntity } from 'typeorm';
import { ItemInBasket } from '../basket/item-in-basket.entity';
export declare class ShopItem extends BaseEntity implements ShopItemInterface {
    id: string;
    name: string;
    description: string;
    price: number;
    photoFn: string;
    itemsInBasket: ItemInBasket[];
}
