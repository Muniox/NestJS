import { IsString } from 'class-validator';

export class AddItemDto {
  @IsString()
  productId: string;

  @IsString()
  userId: string;

  @IsString()
  count: number;
}
