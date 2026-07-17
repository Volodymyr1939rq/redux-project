import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma:PrismaService){}
    
    private async BreadCrumbs(categoryId:string):Promise<{id:string,title:string}[]>{
        const breadcrumbs:{id:string,title:string}[]=[]
        let currentId:string | null=categoryId
        while(currentId){
            const cat=await this.prisma.category.findUnique({
                where:{id:currentId},
                select:{id:true,title:true,parentId:true}
            });
            if(!cat) break;

            breadcrumbs.unshift({id:cat.id,title:cat.title})
            currentId=cat.parentId
        }
        return breadcrumbs
    }
    async create(dto:CategoryDto){
        return await this.prisma.category.create({
            data:{
                title:dto.title,
                parentId:dto.parentId
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
        const breadcrumbs=await this.BreadCrumbs(id)
        return {
            ...category,
            breadcrumbs
        }
    }
}
