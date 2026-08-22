import { Module } from '@nestjs/common';
import { RmqModule } from './infrastructure/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { rmqEnv } from './config/env';
import { mailConfig } from './config/configuration';
import { ValidationSсhema } from './config/validator/validation.sсhema';
import { MailModule } from './infrastructure/mail/mail.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,
    validationSchema:ValidationSсhema,
    load:[
      rmqEnv,
      mailConfig,
    ]
  }),RmqModule, NotificationsModule, MailModule],
})
export class AppModule {}
