import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';
import {ConfigService} from '@nestjs/config'
import { AllConfig } from './config/interfaces/all-configs.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=app.get<ConfigService<AllConfig>>(ConfigService)
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options:{
      urls:[config.get('rmq.url',{infer:true})],
      queue:config.get('rmq.queue',{infer:true}),
      queueOptions:{
        durable:true
      },
      noAck:false,
      prefetchCount:1,
      persistent:true
    }
  })
  await app.startAllMicroservices()
  await app.init()
}
bootstrap();
