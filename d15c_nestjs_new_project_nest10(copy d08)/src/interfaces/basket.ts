import { AddProductDto } from 'src/basket/dto/add-product.dto';

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

export type GetBasketResponse = AddProductDto[];

export type GetTotalBasketPriceResponse =
  | number
  | {
      isSuccess: false;
      alternativeBasket: AddProductDto[];
    };
