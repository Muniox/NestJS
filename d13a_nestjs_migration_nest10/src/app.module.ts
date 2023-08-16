import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { envValidationObjectSchema } from './configs';

@Module({
  imports: [
    BasketModule,
    ShopModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationObjectSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
