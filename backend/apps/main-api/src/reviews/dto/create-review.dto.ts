import { Transform } from 'class-transformer';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from 'class-validator'

export class CreateReviewDto{

    @IsString()
    @IsNotEmpty()
    productId!:string;

    @IsOptional()
    @IsString()
    userId?:string;
    
    @IsNumber()
    @Min(1, { message: 'Рейтинг не може бути меншим за 1' })
    @Max(5, { message: 'Рейтинг не може бути більшим за 5' })
    rating!:number

    @IsString()
    text!:string
     
    @IsString()
    @IsOptional()
    advantages?:string
    
    @IsString()
    @IsOptional()
    disadvantages?:string

    @IsString()
    @IsOptional()
    videoUrl?:string
     
    @IsString()
    @IsOptional()
    imageUrl?:string
     
    @IsString()
    @IsNotEmpty()
    authorName!:string
     
    @IsString()
    @IsNotEmpty()
    authorEmail!:string

    @IsBoolean()
    @IsOptional()
    @Transform(({value})=>value==='true' || value===true)
    notifyOrReply?:boolean

    @IsString()
    @IsOptional()
    replyToId?:string

    @IsOptional()
    @IsString()
    prodcutName?:string
}
