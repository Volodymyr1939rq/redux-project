import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
   
  @Get('list')
    getWishList(@Req() req){
        const userId=req.user.userId
        return this.favoriteService.getWishList(userId)
    }

   @Get('list/:wishlistId')
   getWishListById(@Param('wishlistId') wishlistId:string,@Query('sort') sort:string,@Req() req){
    const userId=req.user.userId
    return this.favoriteService.getWishListById(userId,wishlistId,sort)
   }

  @Get()
    getFavorites(@Req() req:any){
        const userId=req.user.userId
        return this.favoriteService.getFavorite(userId)
    }
    
    @Post('wishlist')
    createWishList(@Body('name') name:string, @Req() req){
        const userId=req.user.userId
        return this.favoriteService.createWishList(userId,name)
    }

    @Post(':productId')
    toggleFavorites(@Param('productId') productId:string,@Body('wishlistId') wishlistId:string,@Req() req:any){
        const userId=req.user.userId
        return this.favoriteService.toggleFavorites(userId,productId,wishlistId)
    }

    @Delete('list/:wishlistId')
    clearWishList(@Param('wishlistId') wishlistId:string,@Request() req){
        const userId=req.user.userId
        return this.favoriteService.deleteWishList(userId,wishlistId)
    }
    

    @Patch('list/:wishlistId')
    updateWishList(@Param('wishlistId') wishlistId:string,@Body('name') name:string,@Req() req){
        const userId=req.user.userId
        return this.favoriteService.updateWishList(userId,wishlistId,name)
    }

    @Patch('list/:id/default')
    makeDefault(@Param('id') wishlistId:string,@Req() req){
        const userId=req.user.userId
        return this.favoriteService.makeDefaultWishList(userId,wishlistId)
    }

    @Patch('item/:id/move')
    moveItem(@Param('id') favoriteId:string,@Body('targetWishListId') targetWishListId:string,@Req() req){
        const userId=req.user.userId
        return this.favoriteService.moveItem(userId,favoriteId,targetWishListId)
    }
    // @Delete(':id')
    // deleteFromWishList(@Param('id') id:string, @Request() req){
    //     const userId=req.user.userId
    //     return this.favoriteService.deleteFavorite(id)
    // }
}
