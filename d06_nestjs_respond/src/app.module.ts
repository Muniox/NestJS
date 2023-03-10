import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoxController } from './fox/fox.controller';
import { PromiseController } from './promise/promise.controller';
import { AsyncController } from './async/async.controller';
import { RxjsController } from './rxjs/rxjs.controller';
import { ResController } from './res/res.controller';
import { TypesController } from './types/types.controller';
import { RedirectController } from './redirect/redirect.controller';
import { ItemController } from './item/item.controller';

@Module({
    imports: [
        // TypeOrmModule.forRoot(),
    ],
    controllers: [AppController, FoxController, PromiseController, AsyncController, RxjsController, ResController, TypesController, RedirectController, ItemController],
    providers: [AppService],
})
export class AppModule {
}
