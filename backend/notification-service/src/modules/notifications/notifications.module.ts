import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigService } from '@nestjs/config';
import { MailModule } from 'src/infrastructure/mail/mail.module';

@Module({
  imports:[MailModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
