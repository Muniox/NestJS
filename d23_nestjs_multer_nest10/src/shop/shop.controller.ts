import {
  Body,
  Controller,
  Get,
  ImATeapotException,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopItemInterface } from 'src/interfaces/shop';
import { AddProductDto } from './dto/add-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  async getShopList(): Promise<ShopItemInterface[]> {
    return await this.shopService.getItems();
  }

  @Get('/test')
  test() {
    // throw new Error('Ups!');
    throw new ImATeapotException('oh noes!');
  }

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: '',
          maxCount: 1,
        },
      ],
      {
        dest: '',
      },
    ),
  )
  async addProduct(@Body() req: AddProductDto): Promise<ShopItemInterface> {
    return await this.shopService.addProduct(req);
  }
}
