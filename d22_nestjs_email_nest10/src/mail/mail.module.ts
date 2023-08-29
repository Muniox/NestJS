import { Module } from '@nestjs/common';
import { nodeMailerConfig } from '../configs/mailer.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRoot(nodeMailerConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
