import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class GetRepliesDto{

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    page?:number

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    limit?:number
}