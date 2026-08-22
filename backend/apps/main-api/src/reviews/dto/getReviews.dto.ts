import { Transform, Type } from "class-transformer"
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator"

export class GetReviewDto{
    productId!:string
    
    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    limit?:number

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    page?:number

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    rating?:number

    @IsOptional()
    @Transform(({value})=>value==='true')
    @IsBoolean()
    withVideo?:boolean
    
    @IsOptional()
    @Transform(({value})=>value==='true')
    @IsBoolean()
    withPhoto?:boolean

    @IsOptional()
    @IsString()
    sortBy?:string

}