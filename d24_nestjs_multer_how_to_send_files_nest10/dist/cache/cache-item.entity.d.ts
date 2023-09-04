import { BaseEntity } from 'typeorm';
export declare class CacheItem extends BaseEntity {
    id: string;
    controllerName: string;
    actionName: string;
    dataJson: string;
    createdAt: Date;
}
