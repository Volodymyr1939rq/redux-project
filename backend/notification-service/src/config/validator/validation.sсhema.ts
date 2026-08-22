import Joi from "joi";

export const ValidationSсhema=Joi.object({
    SMTP_HOST:Joi.string().required(),
    SMTP_PORT:Joi.number().required(),
    SMTP_USERNAME:Joi.string().required(),
    SMTP_PASSWORD:Joi.string().required(),
    SMTP_FROM_ADDRESS:Joi.string().required(),
    SMTP_SECURE:Joi.boolean().required(),

})