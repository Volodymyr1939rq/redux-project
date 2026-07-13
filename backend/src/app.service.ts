import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma:PrismaService){}

  async getBanners(){
    return this.prisma.promoBanner.findMany({
      where:{
        isActive:true
      },
      orderBy:{order:'asc'}
    })
  }
}
