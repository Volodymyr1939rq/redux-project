import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "./paginationDto";
import { Type } from "class-transformer";

export class ProductFilterDto extends PaginationDto{
     
    @IsOptional()
    @IsString()
    categoryId?:string

    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    minPrice?:number

    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    maxPrice?:number

    @IsOptional()
    @IsString()
    seller?:string

    @IsOptional()
    @IsString()
    search?:string

    @IsOptional()
    @IsString()
    brand?:string
     
    @IsOptional()
    @IsString()
    sort?:string
}