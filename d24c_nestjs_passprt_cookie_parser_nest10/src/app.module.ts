import { Module } from '@nestjs/common';
import { envValidationObjectSchema } from './configs';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { CacheModule } from './cache/cache.module';
import { DiscountCodeModule } from './discount-code/discount-code.module';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BasketModule,
    ShopModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationObjectSchema,
    }),
    CacheModule,
    DiscountCodeModule,
    CronModule,
    MailModule,
    AuthModule,
  ],
})
export class AppModule {}
