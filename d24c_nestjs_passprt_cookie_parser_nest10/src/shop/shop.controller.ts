import {
  Body,
  Controller,
  Get,
  ImATeapotException,
  Inject,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopItemInterface } from 'src/interfaces/shop';
import { AddProductDto } from './dto/add-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { multerStorage, storageDir } from 'src/utils/storage';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';

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
          name: 'photo',
          maxCount: 1,
        },
      ],
      {
        storage: multerStorage(path.join(storageDir(), 'product-photos')),
      },
    ),
  )
  async addProduct(
    @Body() req: AddProductDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<ShopItemInterface> {
    return await this.shopService.addProduct(req, files);
  }

  @Get('/photo/:id')
  async getPhoto(@Param('id') id: string, @Res() res: any) {
    return this.shopService.getPhoto(id, res);
  }
}
