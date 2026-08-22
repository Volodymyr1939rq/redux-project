import Joi from "joi";

export const RmqValidator=Joi.object({
    RMQ_URL:Joi.string().required(),
    RMQ_QUEUE:Joi.string().required()
})