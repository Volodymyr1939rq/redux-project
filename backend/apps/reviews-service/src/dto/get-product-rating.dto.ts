export interface GetProductRatingRequest{
    productId:string;
}

export interface RatingDistribution{
    stars:number;
    count:number;
}

export interface GetProductRatingResponse{
    avarageRating:number;
    totalReviews:number;
    distribution:RatingDistribution[];
}