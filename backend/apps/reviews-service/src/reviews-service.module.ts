import { Module } from '@nestjs/common';
import { ReviewsServiceController } from './reviews-service.controller';
import { ReviewsServiceService } from './reviews-service.service';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {validate} from './config/validator/env.validator'
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    validate,
  }),ClientsModule.registerAsync([
    {
      name:'NOTIFICATIONS_SERVICE',
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        transport:Transport.RMQ,
        options:{
          urls:[configService.get<string>('RMQ_URL') as string] ,
          queue:'notifications_queue',
          queueOptions:{
            durable:true
          }
        }
      })
    }
  ]), PrismaModule],
  controllers: [ReviewsServiceController],
  providers: [ReviewsServiceService],
})
export class ReviewsServiceModule {}
