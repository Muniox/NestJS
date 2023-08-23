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
  GetBasketStatsResponse,
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

  @Delete('/all/:userId')
  async clearBasket(@Param('userId') userId: string) {
    await this.basketService.clearBasket(userId);
  }

  @Delete('/:itemInBasketId/:userId')
  async removeProduct(
    @Param('itemInBasketId') itemInBasketId: string,
    @Param('userId') userId: string,
  ): Promise<RemoveFromBasketResponse> {
    return await this.basketService.remove(itemInBasketId, userId);
  }

  @Get('/admin')
  async getBasketForAdmin(): Promise<GetBasketResponse> {
    return await this.basketService.getAllForAdmin();
  }

  @Get('/stats')
  async getStats(): Promise<GetBasketStatsResponse> {
    return await this.basketService.getStats();
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
