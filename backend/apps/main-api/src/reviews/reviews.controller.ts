import { BadRequestException, Body, Controller, Get, Inject, OnModuleInit, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { Observable,firstValueFrom } from "rxjs";
import {FilesInterceptor} from '@nestjs/platform-express'
import { StorageService } from "apps/main-api/storage.service";
import { GetProductRatingRequest, GetProductRatingResponse } from "./dto/getProductRatingGrpcDto";
import { GetReviewsQueryDto } from "./dto/get-reviews-query.dto";
import { CreateReviewDto } from "./dto/create-review.dto";
import { createGrpcReview } from "./dto/createGrpcReviewDto";
import { GetRepliesResponse, GetReviewsGrpcDto } from "./dto/getReviewsGrpcDto";
import { addLikeResponse, addLikeRequest } from "./dto/addLikeGrpcDto";
import { GetRepliesGrpcDto } from "apps/reviews-service/src/dto/getRepliesGrpcDto";
import { GetRepliesDto } from "./dto/GetRepliesDto";



interface ReviewsGrpcService{
    getProductReviews(data:GetReviewsGrpcDto):Observable<any>
    createReviews(data:createGrpcReview):Observable<any>
    getProductRatingSummary(data:GetProductRatingRequest):Observable<GetProductRatingResponse>
    addLike(data:addLikeRequest):Observable<addLikeResponse>
    getReplies(data:GetRepliesGrpcDto):Observable<GetRepliesResponse>
}
@Controller('reviews')
export class ReviewsController implements OnModuleInit{
    private reviewsGrpcService!:ReviewsGrpcService;

    public constructor(@Inject('REVIEWS_PACKAGE') private client:ClientGrpc,
    private readonly storageService:StorageService){}

    public onModuleInit() {
        this.reviewsGrpcService=this.client.getService<ReviewsGrpcService>('ReviewsService')
    }

    @Post()
    @UseInterceptors(
        FilesInterceptor('image',10,{
            limits:{
                fileSize:5*1024*1024
            },
            fileFilter:(req,file,callback)=>{
                if(!file.mimetype.match(/\/(jpg|png|jpeg|gif|webp)$/)){
                    return callback(new BadRequestException('Дозволені лише зображення (jpg, png, gif, webp)'),false)
                }
                callback(null,true)
            }
        })
    )
    async createReview(@Body() dto:CreateReviewDto,@UploadedFiles() files:Express.Multer.File[] ){
        const uploadedFiles=files || []
        const cloudflareImageUrl=await this.storageService.uploadFile(uploadedFiles)

        const grpcPayLoad={
            ...dto,
            rating:Number(dto.rating),
            notifyOrReply:dto.notifyOrReply,
            imageUrl:cloudflareImageUrl,
            videoUrl:dto.videoUrl ? (Array.isArray(dto.videoUrl) ? dto.videoUrl : [dto.videoUrl]):[]
        }

        return await firstValueFrom(this.reviewsGrpcService.createReviews(grpcPayLoad))
    }
    
    @Get(':productId')
    getProductReviews(@Param('productId') productId:string,@Query() query:GetReviewsQueryDto){
        const grpcPayLoad={
            ...query,
            productId
        }
        return this.reviewsGrpcService.getProductReviews(grpcPayLoad)
    }

    @Get(':productId/summary')
    getProductRating(@Param('productId') productId:string){
        return this.reviewsGrpcService.getProductRatingSummary({productId})
    }
     
    @Patch(':id/like')
    addLike(@Param('id') reviewId:string){
        return this.reviewsGrpcService.addLike({reviewId})
    }
    
    @Get(':id/replies')
    getReplies(@Param('id') reviewId:string,@Query() query:GetRepliesDto){
        const GrpcResponse={
            ...query,
            reviewId
        }

        return this.reviewsGrpcService.getReplies(GrpcResponse)
    }
    
}