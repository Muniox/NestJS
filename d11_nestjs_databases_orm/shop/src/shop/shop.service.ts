import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from '../interfaces/shop';
import { BasketService } from '../basket/basket.service';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  getProducts(): GetListOfProductsResponse {
    return [
      {
        name: 'jajka',
        description: 'Świerze kurze jaja',
        price: 8.2,
      },
      {
        name: 'mleko',
        description: 'Świerze mleko',
        price: 4.2 - this.basketService.countPromo(),
      },
      {
        name: 'czekolada',
        description: 'Pyszna czekolada',
        price: 6.0 - this.basketService.countPromo(),
      },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some(item => item.name === name);
  }

  getPriceOfProduct(name: string): number {
    return this.getProducts().find(item => item.name === name).price;
  }
}
