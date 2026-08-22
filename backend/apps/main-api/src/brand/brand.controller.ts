import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async findAll(){
    return await this.brandService.findAll()
  }
  @Post()
  async create(@Body('name') name:string){
    return await this.brandService.create(name)
  }
}
