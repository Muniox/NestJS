import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import {
  GetListOfProductsResponse,
  GetOneProductResponse,
  GetPaginatedListOfProductsResponse,
} from '../interfaces/shop';
import { ShopItem } from './shop-item.entity';
import { In, IsNull, LessThan, Like, MoreThan, Raw } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
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
    return await ShopItem.find({
      // select: ['id', 'price'], //tylko jeśli mamy kłopoty z wydajnością
      where: [
        {
          id: In(['1', '2', '3', '4', '5', '6']), //id mamy jako string, ponieważ uuid, dodatkowo podanie pustej tablicy w mysql powoduje błąd. Rozwiązanie podanie ['']
          description: Like(`%${searchTerm}%`), //Like(% -dowolny ciąg znaków, _ - dowolny znak)
          price: MoreThan(0.1),
        },
        {
          //OR
          description: IsNull(), //zwraca description, które ma Nulla, możemy również zaprzeczyć Not(IsNull())
          price: LessThan(120), //LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Between(od,do)
          // price: Raw((field) => `${field} = 10.95`), //podajemy sql, jest bardzo niebezpieczny, atak typu SQL INJECTION
        },
      ],
      order: {
        price: 'DESC',
        createdAt: 'ASC',
      },
    });
  }
}
