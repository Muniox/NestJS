import { BaseEntity } from 'typeorm';
import { ItemInBasket } from '../basket/item-in-basket.entity';
export declare class User extends BaseEntity {
    id: string;
    email: string;
    itemsInBasket: ItemInBasket[];
}
