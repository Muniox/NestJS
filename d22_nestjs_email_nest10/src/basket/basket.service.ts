import { Inject, Injectable } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import {
  AddToBasketResponse,
  GetBasketResponse,
  GetBasketStatsResponse,
  GetTotalBasketPriceResponse,
  RemoveFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { ItemInBasket } from './item-in-basket.entity';
import { UserService } from '../user/user.service';
import { DataSource, Equal, FindOptionsWhere } from 'typeorm';
import { User } from '../user/user.entity';
import { MailService } from '../mail/mail.service';
import { ShopItem } from '../shop/shop-item.entity';
import { addedToBasketInfoEmailTemplate } from '../templates/email/added-to-basket-info';

@Injectable()
export class BasketService {
  constructor(
    @Inject(ShopService) private shopService: ShopService,
    @Inject(UserService) private userService: UserService,
    @Inject(MailService) private mailService: MailService,
    private readonly dataSource: DataSource,
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

    await this.mailService.sendMail(
      user.email,
      'Dziękujemy za dodanie do koszyka!',
      addedToBasketInfoEmailTemplate(),
    );

    item.shopItem = shopItem;
    item.user = user;

    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(
    itemInBasketId: string,
    userId: string,
  ): Promise<RemoveFromBasketResponse> {
    const user: User = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    const item = await ItemInBasket.findOne({
      where: {
        id: itemInBasketId,
        user: Equal(user.id),
      },
    });
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
      // where: { user } as FindOptionsWhere<User>,
      where: { user: Equal(user.id) },
      relations: ['shopItem'],
    });
  }

  async clearBasket(userId: string) {
    const user: User = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    await ItemInBasket.delete({ user: Equal(user.id) }); //or { user } as FindOptionsWhere<User>
  }

  async getTotalPrice(userId: string): Promise<GetTotalBasketPriceResponse> {
    const items = await this.getAllForUser(userId);

    return (
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }

  async getAllForAdmin(): Promise<ItemInBasket[]> {
    return await ItemInBasket.find({
      relations: ['shopItem', 'user'],
    });
  }

  async getStats(): Promise<GetBasketStatsResponse> {
    const { itemInBasketAvgPrice } = await this.dataSource
      .createQueryBuilder()
      .select('AVG(shopItem.price)', 'itemInBasketAvgPrice')
      .from(ItemInBasket, 'itemInBasket')
      .leftJoinAndSelect('itemInBasket.shopItem', 'shopItem')
      .getRawOne();

    const allitemsInBasket = await this.getAllForAdmin();

    const baskets: { [userId: string]: number } = {};

    for (const oneItemInBasket of allitemsInBasket) {
      baskets[oneItemInBasket.user.id] = baskets[oneItemInBasket.user.id] | 0;

      baskets[oneItemInBasket.user.id] +=
        oneItemInBasket.shopItem.price * oneItemInBasket.count * 1.23;
    }

    const basketValues = Object.values(baskets);

    const basketAvgTotalPrice =
      basketValues.reduce((prev, curr) => prev + curr, 0) / basketValues.length;

    return {
      itemInBasketAvgPrice,
      basketAvgTotalPrice,
    };
  }
}
