import { RmqConfig } from "../interfaces/rmq.interface";
import {registerAs} from '@nestjs/config'
import { validateEnv } from "../utils/env";
import { RmqValidator } from "../validator/rmq.validator";
export const rmqEnv=registerAs<RmqConfig>('rmq',()=>{
    validateEnv(process.env,RmqValidator)

    return {
        url:process.env.RMQ_URL as string,
        queue:process.env.RMQ_QUEUE as string
    }
})