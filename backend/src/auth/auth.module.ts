import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt-strategy';
import { ProviderModule } from './provider/provider.module';
import { getProvidersConfig } from './config/provider.config';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports:[
    ProviderModule.registerAsync({
      imports:[ConfigModule],
      useFactory:getProvidersConfig,
      inject:[ConfigService]
    }),
    UserModule,PassportModule,JwtModule.registerAsync({imports:[ConfigModule],inject:[ConfigService],useFactory:async(ConfigService:ConfigService)=>({
    secret:ConfigService.get<string>('JWT_SECRET') || 'secret',
    signOptions:{expiresIn:'30d'}
  })})],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,PrismaService],
  exports:[AuthService]
})
export class AuthModule {}
