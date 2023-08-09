import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/shop';

@Injectable()
export class ShopService {
  private itemList: GetListOfProductsResponse = [
    {
      name: 'Ogórki kiszone',
      description: 'Bardzo dobre ogórki',
      price: 4,
    },
    {
      name: 'Super ogórki',
      description: 'Jeszcze lepsze ogórki',
      price: 6,
    },
    {
      name: 'Ogórki afrykańskie',
      description: 'Ogórki z dalekich krain',
      price: 5,
    },
  ];

  getProducts(): GetListOfProductsResponse {
    return this.itemList;
  }
}
