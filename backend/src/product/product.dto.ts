import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto{
    @IsString()
    @IsNotEmpty()
    title!:string;

    @IsString()
    @IsNotEmpty()
    description?:string

    @IsNumber()
    @IsNotEmpty()
    price!:number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    oldPrice!:number

    @IsNumber()
    @IsNotEmpty()
    code!:number

    @IsString()
    @IsNotEmpty()
    seller!:string

    @IsString()
    @IsNotEmpty()
    image!:string

    @IsString()
    @IsOptional()
    categoryId?:string

    @IsNotEmpty()
    @IsString()
    brandId!:string
}