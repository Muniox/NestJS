import { BaseEntity ,Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { ShopItemDetails } from "./shop-item-details.entity";
import { ShopSet } from "./shop-set.entity";

@Entity()
export class ShopItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 60,
    })
    name: string;

    @Column({
        type: 'text',
        //kiedy chcemy dać nulla:
        // length: 1000,
        // nullable: true,
        // default: null,
    })
    description: string;
    // kiedy chcemy dać nulla: description: string | null;

    @Column({
        type: 'float',
        precision: 6,
        scale: 2,
    })
    price: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        default: 0,
    })
    boughtCounter: number;

    @Column({
        default: false,
    })
    wasEverBought: boolean;

    @OneToOne(type => ShopItemDetails)
    @JoinColumn()
    details: ShopItemDetails;

    /* Subprodukt */
    @ManyToOne(type => ShopItem, entity => entity.subShopItems)
    mainShopItem: ShopItem;
    
    /* Produkt główny */
    @OneToMany(type => ShopItem, entity => entity.mainShopItem)
    subShopItems: ShopItem[];

    @ManyToMany( type => ShopSet, entity => entity.items)
    @JoinTable()
    sets: ShopSet[];

}