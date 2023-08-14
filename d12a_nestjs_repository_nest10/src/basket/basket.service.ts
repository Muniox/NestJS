import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasketResponse,
} from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  add(item: AddProductDto): AddProductToBasketResponse {
    const { count, name } = item;
    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !this.shopService.hasProduct(name)
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

  remove(index: number): RemoveProductFromBasketResponse {
    const { items } = this;

    if (index < 0 || index >= items.length) {
      return {
        isSuccess: false,
      };
    }

    items.splice(index, 1);

    return {
      isSuccess: true,
    };
  }

  list(): ListProductsInBasketResponse {
    return this.items;
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    if (!this.items.every((item) => this.shopService.hasProduct(item.name))) {
      return {
        isSuccess: false,
        alternativeBasket: this.items.filter((item) =>
          this.shopService.hasProduct(item.name),
        ),
      };
    }

    return await (
      await Promise.all(
        this.items.map(
          async (item) =>
            (await this.shopService.getPriceOfProduct(item.name)) *
            item.count *
            1.23,
        ),
      )
    ).reduce((prev: number, curr: number) => prev + curr, 0);
  }

  async countPromo(): Promise<number> {
    return ((await this.getTotalPrice()) as number) > 10 ? 1 : 0;
  }
}
