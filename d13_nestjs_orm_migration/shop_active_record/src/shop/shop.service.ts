import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from '../interfaces/shop';
import { BasketService } from '../basket/basket.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  
  constructor(
    @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
    ) {}
    
    async getProducts(): Promise<GetListOfProductsResponse> { 
    return await ShopItem.find()
  }
  
  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some(item => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find(item => item.name === name).price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return await ShopItem.findOneOrFail(id);
  }

  async removeProduct(id: string) {
    await ShopItem.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.price = 100;
    newItem.name = 'Duży ogórek';
    newItem.description = 'Naprawdę!';
    
    await newItem.save();
    return newItem
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEverBought: true
    })

    const item = await ShopItem.findOneOrFail(id);

    item.boughtCounter;

    await ShopItem.save(item);
    // lub item.save()
  }
}
