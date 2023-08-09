import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShopItem } from "./shop-item.entity";
import { type } from "os";

@Entity()
export class ShopSet extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length:50
    })
    name:string;

    @ManyToMany(type => ShopSet, entity => entity.items)
    items: ShopItem[]
}