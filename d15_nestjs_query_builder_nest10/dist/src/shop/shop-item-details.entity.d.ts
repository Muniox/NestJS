import { BaseEntity } from 'typeorm';
import { ShopItem } from './shop-item.entity';
export declare class ShopItemsDetails extends BaseEntity {
    id: string;
    color: string;
    width: number;
    shopItem: ShopItem;
}
