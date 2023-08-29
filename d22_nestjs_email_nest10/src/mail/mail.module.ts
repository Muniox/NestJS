import { Module } from '@nestjs/common';
import mailerConfig = require('../configs/mailer.config');
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
})
export class MailModule {}
