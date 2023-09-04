import { IsString, IsNumber } from 'class-validator';

export class AddItemDto {
  @IsString()
  productId: string;

  @IsString()
  userId: string;

  @IsNumber()
  count: number;
}
