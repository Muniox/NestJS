import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//pamiętaj o implementacji w interfejsie, tam też należy dodać typ zmiennej!
//wybranie mariadb w config powoduje zmianę typu 'uuid' na 'unknown' grrrr...
@Entity()
export class ShopItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
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
    precision: 6,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column()
  boughtCounter: number;

  @Column({
    default: false,
  })
  wasEverBought: boolean;
}
