import { Module } from '@nestjs/common';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { BasketController } from './basket/basket.controller';
import { BasketService } from './basket/basket.service';
import { envValidationObjectSchema } from './configs';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationObjectSchema,
    }),
  ],
  controllers: [ShopController, BasketController],
  providers: [ShopService, BasketService],
})
export class AppModule {}
