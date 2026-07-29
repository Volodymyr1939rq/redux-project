import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard)
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
    getFavorites(@Req() req:any){
        const userId=req.user.userId
        return this.favoriteService.getFavorite(userId)
    }

    @Post(':productId')
    toggleFavorites(@Param('productId') productId:string,@Req() req:any){
        const userId=req.user.userId
        return this.favoriteService.toggleFavorites(userId,productId)
    }
}
