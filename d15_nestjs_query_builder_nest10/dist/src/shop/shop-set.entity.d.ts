import { BaseEntity } from 'typeorm';
import { ShopItem } from './shop-item.entity';
export declare class ShopSet extends BaseEntity {
    id: string;
    name: string;
    items: ShopItem[];
}
