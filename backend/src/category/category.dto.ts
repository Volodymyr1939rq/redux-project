import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto{
    @IsString({message:'Назва може бути тільки рядком'})
    @IsNotEmpty({message:'Назва категорії обовязкова'})
    title!:string;

    @IsString({message:'Опис може бути тільки рядком'})
    @IsNotEmpty({message:'Опис категорії обвоязковий'})
    description!:string
}