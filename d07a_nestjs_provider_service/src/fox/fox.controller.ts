import { Body, Controller, Inject, Post } from '@nestjs/common';
import { FoxService } from './fox.service';
import { CreateFoxDto } from '../dto/create-fox.dto';

@Controller('fox')
export class FoxController {
  //Inject() nie jest wymagany jeśli używamy klasy jako providera
  //należy go używać jeśli providerem ma być np. obiekt a w app.module useFactory
  //można też zawsze używać Inject() w ten sposob bedziemi mieli zapewnioną jednolitość w kodzie
  constructor(@Inject(FoxService) private foxService: FoxService) {}

  @Post('/')
  createFox(@Body() newFox: CreateFoxDto): string {
    return this.foxService.createFox(newFox);
  }
}
