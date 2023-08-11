import { Module, forwardRef } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { BasketModule } from '../basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';

//exportuje servis a importuje w innym module ten modul, nie serwis!

//zapamiętać eksportuje serwis, importuje moduł

@Module({
  imports: [
    forwardRef(() => BasketModule),
    TypeOrmModule.forFeature([ShopItem]),
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
