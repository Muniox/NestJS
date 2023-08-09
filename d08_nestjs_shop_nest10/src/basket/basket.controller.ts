import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { BasketService } from './basket.service';
import {
  AddProductToBasketResponse,
  RemoveProductFromBasketResponse,
  ListProductsInBasketResponse,
  GetTotalPriceResponse,
} from 'src/interfaces/basket';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  //Dto tworzymy tylko dla elementów które otrzymujemy od użytkownika, clienta
  @Post('/')
  addProductToBasket(@Body() item: AddProductDto): AddProductToBasketResponse {
    return this.basketService.add(item);
  }

  @Delete('/:index')
  removeProductFromBasket(
    @Param('index', ParseIntPipe) index: number,
  ): RemoveProductFromBasketResponse {
    return this.basketService.remove(index);
  }

  @Get('/')
  listProductsInBasket(): ListProductsInBasketResponse {
    return this.basketService.list();
  }

  @Get('/total-price')
  totalPrice(): GetTotalPriceResponse {
    return this.basketService.getTotalPrice();
  }
}
