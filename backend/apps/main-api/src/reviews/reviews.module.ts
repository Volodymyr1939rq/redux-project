import {Module} from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices";
import {join} from 'path'
import {ReviewsController} from './reviews.controller'
import { StorageService } from "apps/main-api/storage.service";
@Module({
    imports:[
        ClientsModule.register([
            {
                name: 'REVIEWS_PACKAGE',
                transport:Transport.GRPC,
                options:{
                    package:'reviews',
                    protoPath: join(process.cwd(),'proto/review.proto'),
                    url:'localhost:50051'
                }
            }
        ])
    ],
    controllers:[ReviewsController],
    providers:[StorageService]
})
export class ReviewsModule{}


