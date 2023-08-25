import { ShopItemInterface } from 'src/interfaces/shop';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemInBasket } from '../basket/item-in-basket.entity';

@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 1000,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
  })
  price: number;

  @OneToMany(() => ItemInBasket, (entity) => entity.shopItem)
  itemsInBasket: ItemInBasket[];
}
