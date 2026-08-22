import * as Joi from 'joi'

export function validateEnv(config:Record<string,any>,shema:Joi.ObjectSchema){
    const {error}=shema.validate(config,{allowUnknown:true})

    if (error) {
    throw new Error(`Помилка валідації .env файлу: ${error.message}`);
    }
}