import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SendCodeDto{

    @IsString()
    @IsNotEmpty({message:'номер телефону обовязковий'})
    phone!:string
}