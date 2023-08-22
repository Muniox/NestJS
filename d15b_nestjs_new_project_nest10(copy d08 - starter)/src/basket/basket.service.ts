import { Inject, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddToBasketResponse,
  GetTotalBasketPriceResponse,
  GetBasketResponse,
  RemoveFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  async add(item: AddProductDto): Promise<AddToBasketResponse> {
    const { count, name } = item;
    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !(await this.shopService.hasItem(name))
    ) {
      return {
        isSuccess: false,
      };
    }

    this.items.push(item);

    return {
      isSuccess: true,
      index: this.items.indexOf(item),
    };
  }

  remove(number: number): RemoveFromBasketResponse {
    if (this.items[number]) {
      this.items.splice(number, 1);

      return {
        isSuccess: true,
      };
    }

    return {
      isSuccess: false,
    };
  }

  getAll(): GetBasketResponse {
    return this.items;
  }

  async getTotalPrice(): Promise<GetTotalBasketPriceResponse> {
    return (
      await Promise.all(
        this.items.map(
          async (item) =>
            (await this.shopService.getPrice(item.name)) * item.count * 1.23,
        ),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
