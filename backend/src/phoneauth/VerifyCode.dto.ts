import { IsNotEmpty, IsNumber, IsString, Length, MinLength } from "class-validator";

export class VerifyCodeDto{

    @IsString()
    @IsNotEmpty({message:'номер телефону обовязковий'})
    phone!:string


    @IsNotEmpty({message:'Код підтвердження обовзяковий'})
    @IsString()
    @Length(4,4 ,{message:'Код має складатися з 4 цифр '})
    code!:string
}