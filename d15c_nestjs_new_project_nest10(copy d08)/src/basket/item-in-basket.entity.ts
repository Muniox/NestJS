import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AddItemDto } from './dto/add-product.dto';

@Entity()
export class ItemInBasket extends BaseEntity implements AddItemDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column()
  count: number;
}
