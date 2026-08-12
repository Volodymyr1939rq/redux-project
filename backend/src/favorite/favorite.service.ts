import { Injectable, NotFoundException } from '@nestjs/common';
import { link } from 'fs';
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
                product:true,
                wishList:true
            }
        })
    }

    async toggleFavorites(userId:string,productId:string,wishlistId?:string){
        const product=await this.prismaService.product.findUnique({
            where:{
                id:productId
            }
        })
        if(!product){
            throw new NotFoundException('товару не існує')
        }

        let targetWishListId:string

        if(wishlistId){
            targetWishListId=wishlistId
        }else{

            let defaultWishList=await this.prismaService.wishList.findFirst({
                where:{userId:userId,isDefault:true}
            })
            if(!defaultWishList){
                defaultWishList=await this.prismaService.wishList.create({
                    data:{
                        name:'Основний',
                        userId:userId,
                        isDefault:true
                    }
                })
            }
            targetWishListId=defaultWishList.id
        }
        const existingFavorites=await this.prismaService.favorite.findUnique({
            where:{
                wishlistId_productId:{
                    wishlistId:targetWishListId,
                    productId:productId
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
                data:{
                    userId,
                    productId,
                    wishlistId:targetWishListId
                }
            })
            return {message:'Створено вподобання',isFavorite:true}
        }
    }

    async deleteWishList(userId:string,wishlistId){
       const wishList=await this.prismaService.wishList.findFirst({
        where:{
            id:wishlistId,
            userId:userId
        }
       })
       if(!wishList){
        throw new NotFoundException('Такого списку не існує')
       }
        await this.prismaService.wishList.delete({
            where:{
                id:wishlistId
            }
        })

        return {message:'Всі вподобані продукти видалено'}
    }
    async getWishList(userId:string){
         return await this.prismaService.wishList.findMany({
            where:{
                userId:userId
            },
            orderBy:{
                isDefault:'desc'
            },
            include:{
                items:{
                    include:{
                        product:true,
                    }
                }
            }
         })
        }
    async createWishList(userId:string,name:string){
        return await this.prismaService.wishList.create({
            data:{
                userId:userId,
                name:name
            }
        })
    }
    
    async updateWishList(userId:string,wishlistId:string,name:string){
        return await this.prismaService.wishList.update({
            where:{
                id:wishlistId
            },
            data:{
                name:name
            }
        })
    }

    async getWishListById(userId:string,wishlistId:string,sort?:string){
        let itemsOrderBy:any={createdAt:'desc'}

        if(sort==='cheap'){
            itemsOrderBy={product:{price:'asc'}}
        }else if(sort==='expensive'){
            itemsOrderBy={product:{price:'desc'}}
        }

        const wishlist=await this.prismaService.wishList.findFirst({
            where:{
                id:wishlistId,
                userId:userId
            },
            include:{
                items:{
                    orderBy:itemsOrderBy,
                    include:{
                        product:true
                    }
                }
            }
        })
        if(!wishlist){
            throw new NotFoundException('Список не знайдено')
        }
        return wishlist
    }

    async makeDefaultWishList(userId:string,wishlistId:string){
        const wishList=await this.prismaService.wishList.findFirst({
            where:{
                id:wishlistId,
                userId:userId
            }

        })

        if(!wishList){
            throw new NotFoundException('Список не знайдено')
        }
         
        return await this.prismaService.$transaction([
            this.prismaService.wishList.updateMany({
                where:{userId:userId},
                data:{isDefault:false}
            }),
            this.prismaService.wishList.update({
                where:{id:wishlistId},
                data:{isDefault:true}
            })
        ])

    }

    async moveItem(userId:string,favoriteId:string,targetWishListId:string){
        const favoriteItem=await this.prismaService.favorite.findFirst({
            where:{id:favoriteId,userId:userId}
        })
        if(!favoriteItem){
            throw new NotFoundException('Товар не знайдено')
        }

        const targetWishList=await this.prismaService.wishList.findFirst({
            where:{
                id:targetWishListId,
                userId:userId
            }
        })

        if(!targetWishList){
            throw new NotFoundException('Список не знайдено')
        }

        const existingInTarget=await this.prismaService.favorite.findUnique({
            where:{
                wishlistId_productId:{
                    wishlistId:targetWishListId,
                    productId:favoriteItem.productId
                }
            }
        })

        if(existingInTarget){
            await this.prismaService.favorite.delete({
                where:{
                    id:favoriteId
                }
            })
            return {message:'Товар успішно переміщено'}
            
        }

        return await this.prismaService.favorite.update({
            where:{
                id:favoriteId
            },
            data:{
                wishlistId:targetWishListId
            }
        })
    }
}
