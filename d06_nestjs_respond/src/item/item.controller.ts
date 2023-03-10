import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFoxDto } from '../dto/create-fox.dto';

@Controller('item')
export class ItemController {
  @Get('/person/:name/:surname')
  getItem(
    @Param('name') name: string,
    @Param('surname') surname: string,
  ): string {
    return `name: ${name}, surname: ${surname}`;
  }

  @Post('/fox')
  createFox(@Body() newFox: CreateFoxDto): string {
    //odbieramy dane poprzez DTO, czyli stworzoną klasę
    console.log(newFox);
    return `New fox ${newFox.name} created.`;
  }

  @Get('/fox/:id/:title?')
  getFox(@Param('id') id: number): string {
    return `Fox #${id}`;
  }
}
