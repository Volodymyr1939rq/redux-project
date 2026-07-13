import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

   @Get('banners')
  async getBanners(){
    return this.appService.getBanners()
  }
}
