import { Controller, Get, Headers, Ip, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('fox')
export class FoxController {
  @Get()
  myFirstAction(
    @Query('name') name: string,
    @Query('surname') surname: string,
    @Headers('accept-encoding') encoding: string,
    @Ip() ip: string,
    @Req() request: Request,
  ) {
    console.log(encoding);
    console.log(ip);
    console.log(request);
    // return `<h1>Your IP is: ${ip}</h1>`;
    return `<h1>Hi ${name} ${surname}</h1>`;
    /**
     * Jak poprawnie wysyłać query z przeglądarki:
     * encodeURIComponent('nazwa twojego query')
     * */
  }
}
