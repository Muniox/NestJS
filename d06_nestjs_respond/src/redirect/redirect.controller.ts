import { Controller, Get, Post, Redirect } from '@nestjs/common';

@Controller('redirect')
export class RedirectController {
  @Get('/one') //dodajemy kolejny path poprzez Get możemy też dodać np /:id
  @Redirect('/test', 302) //jeśli chcemy do innego controlerra dajemy //nazwaControllera, status domyślny to 302
  myFirstAction(): void {
    console.log('Przekierowano');
  }

  @Get('/second')
  mySecondAction(): string {
    return 'Hello World';
  }

  @Post('/second')
  myThirdAction() {
    return 'Hello World';
  }
}
