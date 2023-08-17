import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import {
  GetListOfProductsResponse,
  GetOneProductResponse,
} from '../interfaces/shop';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  async getProducts(): Promise<GetListOfProductsResponse> {
    //nigdy nie wydzielaj tablicy jako zmiennej, powoduje to błąd, że ta tablica nie istnieje
    return await ShopItem.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
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
      where: {
        description: searchTerm,
        price: 1.0,
      },
      order: {
        price: 'DESC',
        createdAt: 'ASC',
      },
    });
  }
}
