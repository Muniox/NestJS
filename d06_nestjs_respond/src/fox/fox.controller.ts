import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateFoxDto } from 'src/dto/create-fox.dto';

@Controller('fox')
export class FoxController {

  @HttpCode(201)
  @Get('/')
  myFirstAction(): CreateFoxDto {
    /**
     * Nest automatycznie wykrywa co zwracamy np:
     * jeśli wyślemy stringa, to wyślemy nagłówek text/html,
     * jeśli wyślemy tablicę [1,2,3], to wyślemy nagłówek application/json,
     * jeśli nie zamieśliliśmy @Res jako zmiennej w naszej funkcji
     * */
    // return '<h1>tekst</h1>';
    // return [1,2,3];
    return {
      name: 'John',
      age: 100,
      isAdopted: true,
    };
  }
}
