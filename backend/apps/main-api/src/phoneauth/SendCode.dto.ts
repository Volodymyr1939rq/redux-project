import {IsNotEmpty, IsString } from "class-validator";

export class SendCodeDto{

    @IsString()
    @IsNotEmpty({ message: 'Вкажіть номер телефону або електронну пошту' })
    identifier!:string
     
}