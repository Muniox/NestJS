import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('res')
export class ResController {
  @Get()
  myFunction(@Req() req: Request, @Res() res: Response) {
    res.status(200).send('Hello World!');
  }
}
