import { Inject, Injectable} from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { Review } from '../prisma/generated';
import { GetReviewsGrpcRequest } from './dto/get-reviews.dto';
import { createGrpcReview } from './dto/create-grpc-review.dto';
import { GetProductRatingRequest, GetProductRatingResponse } from './dto/get-product-rating.dto';
import { updateReviewGrpc } from './dto/addLikeGrpcDto';
import { GetRepliesGrpcDto } from './dto/getRepliesGrpcDto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {Prisma} from '@prisma/client'
export type ReviewTreeItem=Review & {
  children:ReviewTreeItem[]
}
@Injectable()
export class ReviewsServiceService {
public constructor(
  @Inject('NOTIFICATIONS_SERVICE') private readonly clientProxy:ClientProxy,
 private readonly prismaService:PrismaService){}

 async getReviews(params:GetReviewsGrpcRequest){
      const page=params.page && params.page>0 ? params.page : 1
      const limit=params.limit && params.limit>0 ? params.limit :10 
      const {productId,rating,withVideo,withPhoto,sortBy}=params

      const whereCondition:any={
        productId:productId,
        replyToId:null
      }

      if(rating){
        whereCondition.rating=rating
      }

      if(withPhoto){
        whereCondition.imageUrl={isEmpty:false}
      }

      if(withVideo){
        whereCondition.videoUrl={isEmpty:false}
      }

      let orderByCondition:any={createdAt:'desc'}

      if(sortBy==='rating_desc'){
        orderByCondition={rating:'desc'}
      }

      const reviews= await this.prismaService.review.findMany({
        where:whereCondition,
        include:{
           replies:{
               take:5,
               orderBy:{
          createdAt:'asc'
        }
           }
        },
         orderBy:orderByCondition,
         take:limit,
         skip:(page-1)*limit
      })
      return {reviews}
}

 async createReviews(data:createGrpcReview){
      
       const newReview= await this.prismaService.review.create({
        data:{
          productId:data.productId,
          userId:data.userId || null,
          text:data.text,
          rating:data.rating,
          advantages:data.advantages,
          disadvantages:data.disadvantages,
          authorName:data.authorName,
          authorEmail:data.authorEmail,
          notifyOrReply:data.notifyOrReply,
          imageUrl:data.imageUrl || [],
          videoUrl:data.videoUrl || [],
          replyToId:data.replyToId || null
        }
       })
       if(newReview.replyToId){
        const originalReview=await this.prismaService.review.findUnique({
          where:{
            id:newReview.replyToId
          }
        })
        if(originalReview && originalReview.authorEmail && originalReview.notifyOrReply){

          const payload={
            email:originalReview.authorEmail,
            replyText:newReview.text,
            productName:data.productName || 'Обраний товар'
          }
          await lastValueFrom(this.clientProxy.emit('review.reply.created',payload))
        }
       }
      return newReview
 }

 async getProductRatingSummary(data:GetProductRatingRequest):Promise<GetProductRatingResponse>{
   const {productId}=data

   const summary=await this.prismaService.review.aggregate({
    where:{
      productId:productId,
      replyToId:null
    },
    _avg:{rating:true},
    _count:{id:true}
   })

   const distributionRaw=await this.prismaService.review.groupBy({
    by:['rating'],
    where:{
      productId:productId,
      replyToId:null
    },
    _count:{rating:true}
   })

   const distribution=[5,4,3,2,1].map((star)=>{
       const found=distributionRaw.find((d)=>d.rating===star)
       return {
        stars:star,
        count:found ? found._count.rating : 0
       }
   })
   return {
    avarageRating:summary._avg.rating ? Number(summary._avg.rating.toFixed(1)):0,
    totalReviews:summary._count.id || 0,
    distribution:distribution
   }
 }

 async updateReview(data:updateReviewGrpc){
  try {
     const updateReview=await this.prismaService.review.update({
    where:{
      id:data.reviewId
    },
    data:{
      likes:{
        increment:1
      }
    }
  })

  return {
    id:updateReview.id,
    likes:updateReview.likes
  }
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code==='P2025'){
        throw new RpcException({ code: 5, message: 'Відгук не знайдено' });
      }
    }
    throw error
  }
 
 }

 async getReplies(data:GetRepliesGrpcDto){
  
  const page=data.page && data.page>0 ? data.page : 1
  const limit=data.limit && data.limit>0 ? data.limit :10

  const {reviewId}=data

  const replies=await this.prismaService.review.findMany({
    where:{replyToId:reviewId},
    orderBy:{
      createdAt:'asc'
    },
    take:limit,
    skip:(page-1)*limit
  })

  return {replies}
 }
}
