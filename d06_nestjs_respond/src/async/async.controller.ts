import { Controller, Get } from '@nestjs/common';
import { sleep } from '../utils/sleep';

@Controller('async')
export class AsyncController {
  @Get()
  async myFunction() {
    return await sleep();
  }
}
