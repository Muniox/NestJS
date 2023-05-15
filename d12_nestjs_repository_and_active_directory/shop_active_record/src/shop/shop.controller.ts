import { Controller, Delete, Get, HostParam, Inject, Param, Post, Scope } from '@nestjs/common';
import { CreateProductResponse, GetListOfProductsResponse, GetOneProductResponse } from '../interfaces/shop';
import { ShopService } from './shop.service';
import { ShopItem } from './shop-item.entity';

@Controller({
  path: 'shop',
  host: ':name.lvh.me',
  scope: Scope.REQUEST, // dzieki temu za każdym razem kiedy przychodzi zapytanie tworzy sie nowy obiekt shop controll
})
export class ShopController {
  onModuleInit() {
    /**
     * wykonuje sie po załadowaniu tego modułu, może poinformaować np. że moduł działa
     * lepszy jest on ApplicationBootstrap ponieważ może sie okazać, że nie wszystko wystartowało
     * a jest nam coś potrzebne z innego modułu
     *
     */
  }

  onApplicationBootstrap() {
    //wykonuje się po załadowaniu wszystkich modułów
    console.log('Załadowany');
  }

  //są również metody wykonywane przy zamykaniu:
  onModuleDestroy() {
    //rozpoczęcie zamykania apki
  }

  onApplicationShutdown() {
    //wszysstkie połączenia HTTP zamknięte, apka zaraz zostanie zniszczona
    console.log('Apka zaraz zniknie!');

    /**
     * kilka ważnych rzeczy:
     * Aby to działało zawsze - nawet gdy aplikacja jest ubijana przez system (lub nas samych używamy w main.ts: 
     * app.enableShutdownHooks(); w main.ts)
     * Na Windowsie nie zawsze to zadziała (np. zamykając w menadżerze zadań, aplikacja nie będzie o tym wiedziała).
     * Jednak podczas samych testów wszystko powinno być ok
     */
  }

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getListOfProducts(): Promise<GetListOfProductsResponse> {
    return this.shopService.getProducts();
  }

  @Get('/welcome')
  welcome(@HostParam('name') siteName: string): string {
    return `Witaj na sklepie ${siteName}`;
  }

  @Get('/:id')
  getOneProduct(
    @Param('id') id: string
  ): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete('/:id')
  removeProduct(
    @Param('id') id: string
  ) {
    this.shopService.removeProduct(id);
  }

  @Post('/')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }
}
