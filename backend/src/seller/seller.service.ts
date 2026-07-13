import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SellerService {
    constructor(private readonly prisma:PrismaService){}

    async getUniqSeller(){
        const seller=await this.prisma.product.groupBy({
            by:['seller'],
            _count:{
                seller:true
            }
        })
        return seller.map((s)=>({
            id:s.seller,
            name:s.seller,
            _count:s._count.seller
        }))
    }
}
