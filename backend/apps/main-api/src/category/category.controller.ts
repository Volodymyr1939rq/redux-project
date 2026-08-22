import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() dto:CategoryDto){
    return this.categoryService.create(dto)
  }

  @Get()
  async findAll(){
    return await this.categoryService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id:string){
    return await this.categoryService.findOne(id)
  }
}
