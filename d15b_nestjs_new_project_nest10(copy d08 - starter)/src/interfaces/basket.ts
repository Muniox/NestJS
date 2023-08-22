import { AddItemDto } from 'src/basket/dto/add-product.dto';

export type AddToBasketResponse =
  | {
      isSuccess: true;
      index: number;
    }
  | {
      isSuccess: false;
    };

export interface RemoveFromBasketResponse {
  isSuccess: boolean;
}

export type GetBasketResponse = AddItemDto[];

export type GetTotalBasketPriceResponse =
  | number
  | {
      isSuccess: false;
      alternativeBasket: AddItemDto[];
    };
