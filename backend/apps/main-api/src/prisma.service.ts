import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import {PrismaClient} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy{
    private readonly logger=new Logger(PrismaService.name)
    public async onModuleInit() {
        const start=Date.now()
        this.logger.log('Connecting to database...')

        try {
            await this.$connect();
            
            const ms=Date.now()-start

            this.logger.log(`Database connection established (time=${ms}ms)`)
        } catch (error) {
            this.logger.error('Failed to connect to database: ', error)

            throw error
        }
    }

    public async onModuleDestroy() {
        this.logger.log('Disconecting from database...')

        try {
            await this.$disconnect()
            this.logger.log('Database connection closed')
        } catch (error) {
            this.logger.error('Failed to disconnect from database: ', error)
        }
    }
}