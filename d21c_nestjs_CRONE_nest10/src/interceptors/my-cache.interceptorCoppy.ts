import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const method = context.getHandler();

    const cachedData = this.reflector.get<any>('cacheData', method);
    const cachedTime = this.reflector.get<Date>('cacheTime', method);

    if (cachedData && +cachedTime + 10000 > +new Date()) {
      console.log('Using cached data.');
      return of(cachedData);
    } else {
      console.log('Generating live data.');
      return next.handle().pipe(
        tap((data) => {
          Reflect.defineMetadata('cacheData', data, method);
          Reflect.defineMetadata('cacheTime', new Date(), method);
        }),
      );
    }
  }
}
