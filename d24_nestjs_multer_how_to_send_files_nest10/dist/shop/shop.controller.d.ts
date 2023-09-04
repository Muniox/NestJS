import { ShopService } from './shop.service';
import { ShopItemInterface } from 'src/interfaces/shop';
import { AddProductDto } from './dto/add-product.dto';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
export declare class ShopController {
    private shopService;
    constructor(shopService: ShopService);
    getShopList(): Promise<ShopItemInterface[]>;
    test(): void;
    addProduct(req: AddProductDto, files: MulterDiskUploadedFiles): Promise<ShopItemInterface>;
    getPhoto(id: string, res: any): Promise<void>;
}
