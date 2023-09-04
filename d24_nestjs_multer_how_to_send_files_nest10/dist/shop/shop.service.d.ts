import { ShopItem } from './shop-item.entity';
import { AddProductDto } from './dto/add-product.dto';
import { ShopItemInterface } from '../interfaces/shop';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
export declare class ShopService {
    filter(shopItem: ShopItem): ShopItemInterface;
    getItems(): Promise<ShopItemInterface[]>;
    hasItem(name: string): Promise<boolean>;
    getPrice(name: string): Promise<number>;
    getOneItem(id: string): Promise<ShopItem>;
    addProduct(req: AddProductDto, files: MulterDiskUploadedFiles): Promise<ShopItemInterface>;
    getPhoto(id: string, res: any): Promise<void>;
}
