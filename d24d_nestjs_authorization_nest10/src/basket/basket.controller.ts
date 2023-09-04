import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
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
import { PasswordProtectGuard } from '../guards/Password-protect.guard';
import { UsePassword } from '../decorators/use-password.decorator';
import { MyTimeoutInterceptor } from '../interceptors/my-timeout.interceptor';
import { MyCacheInterceptor } from '../interceptors/my-cache.interceptor';
import { UseCacheTime } from '../decorators/use-cache-time.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { User } from '../user/user.entity';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async addProductToBasket(
    @Body() item: AddItemDto,
    @UserObj() user: User,
  ): Promise<AddToBasketResponse> {
    console.log({ user });

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
  @UseGuards(PasswordProtectGuard)
  @UsePassword('admin1')
  async getBasketForAdmin(): Promise<GetBasketResponse> {
    return await this.basketService.getAllForAdmin();
  }

  @Get('/stats')
  @UseGuards(PasswordProtectGuard)
  @UsePassword('passforstats')
  @UseCacheTime(60)
  @UseInterceptors(MyTimeoutInterceptor, MyCacheInterceptor)
  async getStats(): Promise<GetBasketStatsResponse> {
    // return new Promise((resolve) => {});
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
