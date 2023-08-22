import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
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

  @Post('/')
  async addProductToBasket(
    @Body() item: AddItemDto,
  ): Promise<AddToBasketResponse> {
    return await this.basketService.add(item);
  }

  @Delete('/all')
  async clearBasket() {
    await this.basketService.clearBasket();
  }

  @Delete('/:id')
  async removeProduct(
    @Param('id') id: string,
  ): Promise<RemoveFromBasketResponse> {
    return await this.basketService.remove(id);
  }

  @Get('/:userId')
  async getBasket(@Param('userId') userId: string): Promise<GetBasketResponse> {
    return await this.basketService.getAllForUser(userId);
  }

  @Get('/total-price/:userId')
  async getTotalBasketPrice(
    @Param('userId') userId: string,
  ): Promise<GetTotalBasketPriceResponse> {
    return await this.basketService.getTotalPrice(userId);
  }
}
