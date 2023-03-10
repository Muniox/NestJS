import { Controller, Get } from '@nestjs/common';

@Controller('promise')
export class PromiseController {
  @Get()
  myFirstFunction(): Promise<string> {
    return new Promise(resolve =>
      setTimeout(() => resolve('Hello, World after 2.5s'), 2500),
    );
  }
}
