import { Review } from "apps/reviews-service/prisma/generated"

export interface GetReviewsGrpcDto{
    productId:string
    limit?:number
    page?:number
    rating?:number
    withVideo?:boolean
    withPhoto?:boolean
    sortBy?:string
}

export interface GetRepliesResponse{
    replies:Review[]
}