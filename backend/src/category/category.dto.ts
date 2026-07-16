import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CategoryDto{
    @IsString({message:'Назва може бути тільки рядком'})
    @IsNotEmpty({message:'Назва категорії обовязкова'})
    title!:string;
     
    @IsOptional()
    @IsNotEmpty()
    parentId?:string
}