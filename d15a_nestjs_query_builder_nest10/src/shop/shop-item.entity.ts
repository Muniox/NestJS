import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemsDetails } from './shop-item-details.entity';
import { ShopSet } from './shop-set.entity';
import { ShopItemInterface } from 'src/interfaces/shop';

//pamiętaj o implementacji w interfejsie, tam też należy dodać typ zmiennej!
//wybranie mariadb w config powoduje zmianę typu 'uuid' na 'unknown' grrrr...
@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: '',
    length: 25,
  })
  name: string;

  @Column({
    type: 'text',
    default: '',
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
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

  @OneToOne(() => ShopItemsDetails)
  @JoinColumn()
  details: ShopItemsDetails;

  //jest to powiązanie w tej samej tabeli połączenie mainShopItem to id, a nastepnie id to mainShopItem
  /** Subprodukt */
  @ManyToOne(() => ShopItem, (entity) => entity.subShopItems)
  mainShopItem: ShopItem;

  /**Produkt główny */
  @OneToMany(() => ShopItem, (entity) => entity.mainShopItem)
  subShopItems: ShopItem[];

  @ManyToMany(() => ShopSet, (entity) => entity.items)
  @JoinTable()
  sets: ShopSet[];
}
