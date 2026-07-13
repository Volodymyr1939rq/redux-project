import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { ProductFilterDto } from './productFilter.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
    @Get(':id')
  async getOneProduct(@Param('id') id:string){
    const product=await this.productService.getOneProduct(id)
    return product
  }

  @Post()
  async create(@Body() dto:ProductDto){
    return await this.productService.create(dto)
  }

  @Get()
  async findAll(@Query() query:ProductFilterDto){
    return await this.productService.findAllWithFilters(query)
  }
}
