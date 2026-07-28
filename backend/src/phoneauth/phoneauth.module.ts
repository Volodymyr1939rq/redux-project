import { Module } from '@nestjs/common';
import { PhoneauthService } from './phoneauth.service';
import { PhoneauthController } from './phoneauth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[AuthModule,UserModule],
  controllers: [PhoneauthController],
  providers: [PhoneauthService],
})
export class PhoneauthModule {}
