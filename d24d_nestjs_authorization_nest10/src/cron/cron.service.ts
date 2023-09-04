import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_MINUTE)
  showSomeInfo() {
    console.log('Some info ...', new Date());
  }

  @Cron('1/15 * * * 1-5')
  showSomeInfo2() {
    console.log('Some info ...', new Date());
  }
}
