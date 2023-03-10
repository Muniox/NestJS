import { Controller, Get } from '@nestjs/common';
import { of } from 'rxjs';

@Controller('rxjs')
export class RxjsController {
  @Get()
  myFunction() {
    return of([]);
  }
}
