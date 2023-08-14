import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import {
  GetListOfProductsResponse,
  GetOneProductResponse,
} from '../interfaces/shop';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(): Promise<GetListOfProductsResponse> {
    //nigdy nie wydzielaj tablicy jako zmiennej, powoduje to błąd, że ta tablica nie istnieje
    return await this.shopItemRepository.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  async getOneProduct(id: string): Promise<GetOneProductResponse> {
    return this.shopItemRepository.findOneOrFail({ where: { id } });
  }

  async removeProduct(id: string) {
    await this.shopItemRepository.delete(id);
  }
}
