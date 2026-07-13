import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BrandService {
    constructor(private readonly prisma:PrismaService){}

    async findAll(){
        const brands=await this.prisma.brand.findMany({
            include:{
                _count:{
                    select:{products:true}
                },
            },
            orderBy:{createdAt:"asc"}
        })
        return brands.map((brand)=>({
            id:brand.id,
            name:brand.name,
            count:brand._count.products
        }))
    }

    async create(name:string){
        return await this.prisma.brand.create({
            data:{
                name
            }
        })
    }
}
