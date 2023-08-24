import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImATeapotExceptionFilter } from './filters/im-a-teapot-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ImATeapotExceptionFilter());

  await app.listen(3000);
}
bootstrap();
