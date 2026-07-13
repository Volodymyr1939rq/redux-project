import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [CategoryModule, ProductModule, BrandModule, SellerModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
