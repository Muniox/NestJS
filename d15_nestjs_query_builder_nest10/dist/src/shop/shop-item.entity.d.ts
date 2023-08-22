import { BaseEntity } from 'typeorm';
import { ShopItemsDetails } from './shop-item-details.entity';
import { ShopSet } from './shop-set.entity';
export declare class ShopItem extends BaseEntity {
    id: string;
    name: string;
    description: string | null;
    price: number;
    createdAt: Date;
    boughtCounter: number;
    wasEverBought: boolean;
    details: ShopItemsDetails;
    mainShopItem: ShopItem;
    subShopItems: ShopItem[];
    sets: ShopSet[];
}
