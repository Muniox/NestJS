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
import { AddItemDto } from './dto/add-product.dto';
import { BasketService } from './basket.service';
import {
  AddToBasketResponse,
  RemoveFromBasketResponse,
  GetBasketResponse,
  GetTotalBasketPriceResponse,
} from 'src/interfaces/basket';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  //Dto tworzymy tylko dla elementów które otrzymujemy od użytkownika, clienta
  @Post('/')
  async addProductToBasket(
    @Body() item: AddItemDto,
  ): Promise<AddToBasketResponse> {
    return await this.basketService.add(item);
  }

  @Delete('/:index')
  removeProduct(
    @Param('index', ParseIntPipe) index: number,
  ): RemoveFromBasketResponse {
    return this.basketService.remove(index);
  }

  @Get('/')
  getBasket(): GetBasketResponse {
    return this.basketService.getAll();
  }

  @Get('/total-price')
  async getTotalBasketPrice(): Promise<GetTotalBasketPriceResponse> {
    return await this.basketService.getTotalPrice();
  }
}
