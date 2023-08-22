import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import {
  GetListOfProductsResponse,
  GetOneProductResponse,
  GetPaginatedListOfProductsResponse,
} from '../interfaces/shop';
import { ShopItem } from './shop-item.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
    private readonly dataSource: DataSource,
  ) {}

  async getProducts(
    pageNumber: number = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
    const maxPerPage = 3;
    const currentPage = pageNumber;

    const [items, count] = await ShopItem.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(count / maxPerPage);
    console.log(pagesCount);

    return { items, pagesCount };
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).items.some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).items.find((item) => item.name === name)
      .price;
  }

  async getOneProduct(id: string): Promise<GetOneProductResponse> {
    return ShopItem.findOneOrFail({ where: { id } });
  }

  async removeProduct(id: string) {
    await ShopItem.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.price = 100;
    newItem.name = 'Duży ogórek';
    newItem.description = 'naprawdę duży ogórek';

    await newItem.save();
    return newItem;
  }

  async addBoughtCounter(id: string) {
    //Aktualizacja bez pobierania encji
    //1. Jest krotsza
    //2. jest szybsza - 1operacja zamiast 2
    //3.jest bezpieczniejsza - jeżeli wystąpiła by konkurencja(concurency), to dane będą aktualne

    console.log(id);
    await ShopItem.update({ id }, { wasEverBought: true });

    const item = await ShopItem.findOneOrFail({ where: { id } }); //lepiej stosować aktualizacje bez pobierania

    item.boughtCounter++; //lepiej stosować aktualizacje bez pobierania

    await item.save(); //lepiej stosować aktualizacje bez pobierania
  }

  async findProducts(searchTerm: string): Promise<GetListOfProductsResponse> {
    const { count } = await this.dataSource
      .createQueryBuilder()
      .select('COUNT(shopItem.id)', 'count')
      .from(ShopItem, 'shopItem')
      .getRawOne();
    console.log({ count });

    return await this.dataSource
      .createQueryBuilder()
      .select('shopItem')
      .from(ShopItem, 'shopItem')
      .where('shopItem.description LIKE :searchTerm', {
        searchTerm: `${searchTerm}`,
      })
      .orderBy('shopItem.id', 'ASC')
      .getMany();
  }
}
