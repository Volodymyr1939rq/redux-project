import { IsNotEmpty, IsNumber, IsNumberString, IsPhoneNumber, IsString, Length, MinLength } from "class-validator";

export class VerifyCodeDto{

    @IsString()
    @IsNotEmpty({message:'номер телефону обовязковий'})
    identifier!:string

    @IsString()
    @IsNotEmpty({message:'Код підтвердження обовзяковий'})
    @Length(4,4 ,{message:'Код має складатися з 4 цифр '})
    code!:string
}