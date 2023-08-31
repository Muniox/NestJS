import { Injectable } from '@nestjs/common';
import { ShopItem } from './shop-item.entity';
import { AddProductDto } from './dto/add-product.dto';
import { ShopItemInterface } from '../interfaces/shop';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from 'src/utils/storage';

@Injectable()
export class ShopService {
  async getItems(): Promise<ShopItem[]> {
    return ShopItem.find();
  }

  async hasItem(name: string): Promise<boolean> {
    return (await this.getItems()).some((item) => item.name === name);
  }

  async getPrice(name: string): Promise<number> {
    return (await this.getItems()).find((item) => item.name === name).price;
  }

  async getOneItem(id: string): Promise<ShopItem> {
    return await ShopItem.findOneBy({ id });
  }

  async addProduct(
    req: AddProductDto,
    files: MulterDiskUploadedFiles,
  ): Promise<ShopItemInterface> {
    const photo = files?.photo?.[0] ?? null;
    try {
      console.log({ photo });

      const shopItem = new ShopItem();
      shopItem.name = req.name;
      shopItem.description = req.description;
      shopItem.price = req.price;

      if (photo) {
        shopItem.photoFn = photo.filename;
      }

      await shopItem.save();

      return {
        id: shopItem.id,
        name: shopItem.name,
        description: shopItem.description,
        price: shopItem.price,
      };
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(
            path.join(storageDir(), 'product-photos', photo.filename),
          );
        }
      } catch (e2) {}

      throw e;
    }
  }
}
