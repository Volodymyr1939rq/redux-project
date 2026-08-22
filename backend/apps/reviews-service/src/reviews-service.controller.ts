import { Controller} from '@nestjs/common';
import { ReviewsServiceService } from './reviews-service.service';
import {GrpcMethod} from '@nestjs/microservices'
import { GetReviewDto } from './dto/getReviewsDto';
import type { createGrpcReview } from './dto/create-grpc-review.dto';
import type { GetProductRatingRequest } from './dto/get-product-rating.dto';
import type { updateReviewGrpc } from './dto/addLikeGrpcDto';
import type { GetRepliesGrpcDto } from './dto/getRepliesGrpcDto';

@Controller()
export class ReviewsServiceController {
  constructor(private readonly reviewsServiceService: ReviewsServiceService) {}
   
  
  @GrpcMethod('ReviewsService','GetProductReviews')
  async getProductsReviews(data:GetReviewDto){
    const reviews=await this.reviewsServiceService.getReviews(data)
    return reviews
  }

  @GrpcMethod('ReviewsService','createReviews')
  async createReviews(data:createGrpcReview){
     const createReview=await this.reviewsServiceService.createReviews(data)
     return createReview
  }

  @GrpcMethod('ReviewsService','GetProductRatingSummary')
  async getProductRatingSummary(data:GetProductRatingRequest){
    const getProductRating=await this.reviewsServiceService.getProductRatingSummary(data)
    return getProductRating
  }

  @GrpcMethod('ReviewsService','AddLike')
  async addLike(data:updateReviewGrpc){
    const addlike=await this.reviewsServiceService.updateReview(data)
    return addlike
  }

  @GrpcMethod('ReviewsService','GetReplies')
  async getReplies(data:GetRepliesGrpcDto){
    const getreplies=await this.reviewsServiceService.getReplies(data)
    return getreplies
  }
}
