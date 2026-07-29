import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { SellerModule } from './seller/seller.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from './auth/provider/provider.module';
import { PhoneauthModule } from './phoneauth/phoneauth.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [CategoryModule, ProductModule, BrandModule, SellerModule, AuthModule, UserModule,ConfigModule.forRoot({isGlobal:true}), ProviderModule, PhoneauthModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
