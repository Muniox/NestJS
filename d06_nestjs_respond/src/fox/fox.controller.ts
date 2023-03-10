import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('fox')
export class FoxController {
  @Get('/')
  myFirstAction() {
    /**
     * Nest automatycznie wykrywa co zwracamy np:
     * jeśli wyślemy stringa, to wyślemy nagłówek text/html,
     * jeśli wyślemy tablicę [1,2,3], to wyślemy nagłówek application/json,
     * jeśli nie zamieśliliśmy @Res jako zmiennej w naszej funkcji
     * */
    // return '<h1>tekst</h1>';
    // return [1,2,3];
    return {
      numberOfFoxes: 100,
      areFoxesHappy: true,
    };
  }
}
