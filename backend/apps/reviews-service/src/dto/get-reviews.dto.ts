export interface GetReviewsGrpcRequest {
  productId: string;
  page?: number;
  limit?: number;
  rating?: number;
  withPhoto?: boolean;
  withVideo?: boolean;
  sortBy?: string;
}