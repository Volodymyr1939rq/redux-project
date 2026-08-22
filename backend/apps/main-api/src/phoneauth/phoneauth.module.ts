import { Module } from '@nestjs/common';
import { PhoneauthService } from './phoneauth.service';
import { PhoneauthController } from './phoneauth.controller';
import { AuthModule } from 'apps/main-api/src/auth/auth.module';
import { UserModule } from 'apps/main-api/src/user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ThrottlerModule.forRoot([{
    ttl:60000,
    limit:3
  }]),
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATIONS_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
       
          const rmqUrl = configService.get<string>('RMQ_URL')
          if (!rmqUrl) {
            throw new Error('RMQ_URL is not defined in main-api .env file!');
          }
      
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rmqUrl], 
              queue: 'notifications_queue',
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [PhoneauthController],
  providers: [PhoneauthService],
})
export class PhoneauthModule {}