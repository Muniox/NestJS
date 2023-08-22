import { Inject, Injectable } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import {
  AddToBasketResponse,
  GetBasketResponse,
  GetTotalBasketPriceResponse,
  RemoveFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { ItemInBasket } from './item-in-basket.entity';
import { UserService } from '../user/user.service';
import { Equal } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(ShopService) private shopService: ShopService,
    @Inject(UserService) private userService: UserService,
  ) {}

  async add(product: AddItemDto): Promise<AddToBasketResponse> {
    const { count, productId, userId } = product;

    const shopItem = await this.shopService.getOneItem(productId);
    const user = await this.userService.getOneUser(userId);

    if (
      typeof productId !== 'string' ||
      typeof userId !== 'string' ||
      typeof count !== 'number' ||
      productId === '' ||
      userId === '' ||
      count < 1 ||
      !shopItem ||
      !user
    ) {
      return {
        isSuccess: false,
      };
    }

    const item = new ItemInBasket();
    item.count = count;

    await item.save();

    item.shopItem = shopItem;
    item.user = user;

    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(id: string): Promise<RemoveFromBasketResponse> {
    const item = await ItemInBasket.findOneBy({ id });
    if (item) {
      await item.remove();

      return {
        isSuccess: true,
      };
    }

    return {
      isSuccess: false,
    };
  }

  async getAllForUser(userId: string): Promise<ItemInBasket[]> {
    const user: User = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    return await ItemInBasket.find({
      where: {
        user: Equal(user.id),
      },
      relations: ['shopItem'],
    });
  }

  async clearBasket() {
    await ItemInBasket.delete({});
  }

  async getTotalPrice(userId: string): Promise<GetTotalBasketPriceResponse> {
    const items = await this.getAllForUser(userId);

    return (
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
