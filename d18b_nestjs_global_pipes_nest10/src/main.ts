import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages:
        configService.get<string>('NODE_ENV') !== 'development',

      whitelist: true,
      forbidNonWhitelisted: true,

      transform: true, //Zmienia parametr na taki, jaki mamy
      // w typescript, natomiast nie waliduje, tzn. nie wyrzuci błędu, jeśli mamy stringa zamiast numbera
    }),
  );
  await app.listen(3000);
}
bootstrap();
