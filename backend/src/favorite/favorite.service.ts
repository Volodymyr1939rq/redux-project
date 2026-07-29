import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteService {
    constructor(private readonly prismaService:PrismaService){}

    async getFavorite(userId:string){
        return await this.prismaService.favorite.findMany({
            where:{
                userId
            },
            include:{
                product:true
            }
        })
    }

    async toggleFavorites(userId:string,productId:string){
        const product=await this.prismaService.product.findUnique({
            where:{
                id:productId
            }
        })
        if(!product){
            throw new NotFoundException('товару не існує')
        }

        const existingFavorites=await this.prismaService.favorite.findUnique({
            where:{
                userId_productId:{
                    userId,
                    productId
                }
            }
        });
        if(existingFavorites){
            await this.prismaService.favorite.delete({
                where:{
                    id:existingFavorites.id
                }
            })
            return {message:"Видалено з уподобань",isFavorite:false}
        }else{
            await this.prismaService.favorite.create({
                data:{userId,productId}
            })
            return {message:'Створено вподобання',isFavorite:true}
        }
    }
}
