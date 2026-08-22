import { plainToInstance } from "class-transformer";
import {  IsString, IsUrl, validateSync } from "class-validator";

export class EnvironmentVariables{
    @IsUrl({protocols:['amqp']})
    public RMQ_URL!:string

    @IsString()
    public RMQ_QUEUE!:string
}

export function validate(config:Record<string,unknown>){
    const validateConfig=plainToInstance(EnvironmentVariables,config,{
        enableImplicitConversion:true
    })

    const errors=validateSync(validateConfig,{skipMissingProperties:false})

    if(errors.length>0){
        throw new Error(`Помилка валідації .env файлу: ${errors.toString()}`);
    }
    return validateConfig
}