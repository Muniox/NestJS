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
  GetPaginatedListOfProductsResponse,
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

  @Get('/:pageNumber')
  async getListOfProducts(
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
  ): Promise<GetPaginatedListOfProductsResponse> {
    return await this.shopService.getProducts(pageNumber);
  }

  @Get('/find/:searchTerm')
  async testFindItem(
    @Param('searchTerm') searchTerm: string,
  ): Promise<GetListOfProductsResponse> {
    return await this.shopService.findProducts(searchTerm);
  }

  @Get('/welcome')
  welcome(@HostParam('name') siteName: string): string {
    return `Witam na sklepie ${siteName}`;
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
}
