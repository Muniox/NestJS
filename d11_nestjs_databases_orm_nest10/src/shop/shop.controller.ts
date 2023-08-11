import {
  Controller,
  Get,
  HostParam,
  Inject,
  Param,
  ParseIntPipe,
  Scope,
} from '@nestjs/common';
import { GetListOfProductsResponse } from '../interfaces/shop';
import { ShopService } from './shop.service';

@Controller({
  path: 'shop',
  // host: ':name.lvh.me',
  // scope: Scope.REQUEST, // dzieki temu za każdym razem kiedy przychodzi zapytanie tworzy sie nowy obiekt shop controll,
  // dzieki scope możemy rozdzielać nasze objekty aby były różne dla każdego użytkownika
})
export class ShopController {
  onApplicationBootstrap() {
    console.log('Załadowany');
  }
  onApplicatopnShutdown() {
    console.log('apka zaraz zniknie');
  }

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getLtstOfProducts(): GetListOfProductsResponse {
    return this.shopService.getProducts();
  }

  @Get('/welcome')
  welcome(
    @Param('age', ParseIntPipe) age: number,
    @HostParam('name') siteName: string,
  ): string {
    return `Witah na sklepie ${siteName}`;
  }
}
