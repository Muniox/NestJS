import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopItemInterface } from 'src/interfaces/shop';
import { CheckAgePipe } from 'src/pipes/check-age';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  async getShopList(): Promise<ShopItemInterface[]> {
    return await this.shopService.getItems();
  }

  //jeśli wyślemy w parametrze wyraz to dostaniemy błąd bo nam waliduje i oczekuje liczby
  @Get('/test/:index?')
  test(
    @Param(
      'index',
      new DefaultValuePipe(0),
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.FORBIDDEN,
      }),
    )
    index?: string,
  ) {
    console.log(typeof index);
    return '';
  }

  @Get('/test/:age')
  checkAge(@Param('age', new CheckAgePipe({ minAge: 21 })) age: number) {
    console.log(typeof age, age);
    return '';
  }
}
