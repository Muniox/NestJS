import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemInBasket } from '../basket/item-in-basket.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  email: string;

  @Column()
  pwdHash: string;

  @Column({
    nullable: true,
    default: true,
  })
  currentTokenId: string | null;

  @OneToMany(() => ItemInBasket, (entity) => entity.user)
  itemsInBasket: ItemInBasket[];
}
