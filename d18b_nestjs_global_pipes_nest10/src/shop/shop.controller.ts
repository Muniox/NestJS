import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopItemInterface } from 'src/interfaces/shop';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  async getShopList(): Promise<ShopItemInterface[]> {
    return await this.shopService.getItems();
  }

  @Get('/test/:age')
  checkAge(@Param('age') age: number) {
    console.log(typeof age, age);
    return '';
  }
}
