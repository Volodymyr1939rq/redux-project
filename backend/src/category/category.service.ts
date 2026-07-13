import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma:PrismaService){}

    async create(dto:CategoryDto){
        return await this.prisma.category.create({
            data:{
                title:dto.title,
            }
        })
    }
    async findAll(){
        return await this.prisma.category.findMany()
    }

    async findOne(id:string){
        const category=await this.prisma.category.findUnique({
            where:{
                id:id
            },
            include:{
                products:true,
                children:true
            }
        })
        if(!category){
            throw new NotFoundException('Категорію не знайдено') 
        }
        return category;
    }
}
