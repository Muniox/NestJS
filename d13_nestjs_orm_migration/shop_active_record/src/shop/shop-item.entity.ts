import { BaseEntity ,Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}