import {
  Controller,
  Delete,
  Get,
  HostParam,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  // Scope,
} from '@nestjs/common';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
} from '../interfaces/shop';
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
  onApplicationShutdown() {
    console.log('apka zaraz zniknie');
  }

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  async getListOfProducts(): Promise<GetListOfProductsResponse> {
    return await this.shopService.getProducts();
  }

  @Get('/:id')
  async getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return await this.shopService.getOneProduct(id);
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string) {
    await this.shopService.removeProduct(id);
  }

  @Post('/')
  async createNewProduct(): Promise<CreateProductResponse> {
    return await this.shopService.createDummyProduct();
  }

  @Get('/welcome')
  welcome(
    @Param('age', ParseIntPipe) age: number,
    @HostParam('name') siteName: string,
  ): string {
    return `Witam na sklepie ${siteName}`;
  }
}
