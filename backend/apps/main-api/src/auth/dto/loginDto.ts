import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class loginDto{

    @IsString({message:'Email має бути рядком'})
    @IsEmail({},{message:'Не коректний формат email'})
    @IsNotEmpty({message:'Email обовязковий для заповнення'})
    email!:string

    @IsString({message:'пароль має бути рядком'})
    @IsNotEmpty({message:'Пароль обовязковий для заповнення'})
    @MinLength(6,{message:'Пароль повинен містити не менше 6 символів'})
    password!:string
}