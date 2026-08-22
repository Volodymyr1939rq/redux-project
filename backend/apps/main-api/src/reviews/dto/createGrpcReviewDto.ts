export interface createGrpcReview{
    productId: string;
    userId?: string;
    rating: number; 
    text: string;
    advantages?: string;
    disadvantages?: string;
    authorName: string;
    authorEmail: string;
    notifyOrReply?: boolean; 
    imageUrl: string[];
    videoUrl: string[];
    productName?:string
}