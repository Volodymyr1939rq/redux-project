import * as dotenv from 'dotenv'
import {NestFactory} from "@nestjs/core"
import {MicroserviceOptions,Transport} from '@nestjs/microservices'
import {join} from 'path'
import { ReviewsServiceModule } from "./reviews-service.module"
import { ValidationPipe } from "@nestjs/common"
dotenv.config({path:join(process.cwd(),'apps','reviews-service','.env')})
async function bootstrap(){
    const app=await NestFactory.createMicroservice<MicroserviceOptions>(
        ReviewsServiceModule,
        {
            transport:Transport.GRPC,
            options:{
                package:'reviews',
                protoPath: join(process.cwd(),'proto/review.proto'),
                url:'localhost:50051',
                loader:{
                    keepCase:true,
                    longs:String,
                    enums:String,
                    defaults:true,
                    oneofs:true
                }
            }
        }
    )
   app.useGlobalPipes(new ValidationPipe())
   await app.listen()
}
bootstrap()