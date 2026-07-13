import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from './product.dto';
import { ProductFilterDto } from './productFilter.dto';

@Injectable()
export class ProductService {
    constructor(private readonly prisma:PrismaService){}
    
    async create(dto:ProductDto){
        return await this.prisma.product.create({
            data:{
                title:dto.title,
                description:dto.description,
                price:dto.price,
                oldPrice:dto.oldPrice || 0,
                code:dto.code,
                seller:dto.seller,
                image:dto.image,
                categoryId:dto.categoryId,
                brandId:dto.brandId,
            }
        })
    }
    async getProducts(searchTerm?:string) {
    if(!searchTerm){
      return this.prisma.product.findMany();
    }
    return this.prisma.product.findMany({
      where:{
        title:{
          contains:searchTerm,
          mode:'insensitive'
        }
      }
    })
  }
  async getOneProduct(id:string){
    return this.prisma.product.findUnique({
      where:{
        id:id
      }
    });
  }

  async findAllWithFilters(query:ProductFilterDto){
    
    const {categoryId,minPrice,maxPrice,seller,search,brand,sort,page=1,limit=10}=query
    const skip=(page-1)*limit
    const searchTerm=query.search
    const where:any={}
    
    let orderBy:any={
      createdAt:'desc'
    }
    if (sort){
      switch(sort){
        case 'cheap':
          orderBy={price:'asc'}
          break;
        case 'expensive':
          orderBy={price:'desc'}
          break;
        case 'novelty':
          orderBy={createdAt:'desc'}
          break;
        default:
          orderBy={createdAt:'desc'}
          break;
        }
      }
    if(categoryId){
        where.categoryId=categoryId
    }
    if(seller){
      const sellersArray=seller.split(',')
      if(seller.includes('other')){
        where.seller={
          not:'Rozetka'
        }
      }else{
        where.seller={
          in:sellersArray
        }
      }
    }
    if(minPrice || maxPrice){
        where.price={}
        if(minPrice) where.price.gte=Number(minPrice)
        if(maxPrice) where.price.lte=Number(maxPrice)
    }

    if(brand){
      const brandArray=brand.split(',')

      where.brandId={
        in:brandArray
      }
    }
    
    if(search){
        where.OR=[
            {title:{contains:search,mode:'insensitive'}},
            {description:{contains:search,mode:'insensitive'}}
        ]
    }

    const [products,total]=await Promise.all([
        this.prisma.product.findMany({
            skip:skip,
            take:limit,
            orderBy:orderBy,
            where:where,
            include:{
                category:{select:{id:true,title:true}},
            }
        }),
        this.prisma.product.count({where:where})
    ])
    
return {
    data:products,
    total,
    page,
    lastPage:Math.ceil(total/limit)

}
  }
}
