import { Controller, Get, Header, HttpCode } from '@nestjs/common';
import { UserData } from '../interface/user-data';

@Controller('types')
export class TypesController {
  @Get()
  @HttpCode(204) // status kodu to "no content"
  @Header('X-My-test', 'Hello World')
  myFunction(): UserData {
    return {
      name: 'Testowa',
      surname: 'Osoba',
      age: 100,
    };
  }
}
