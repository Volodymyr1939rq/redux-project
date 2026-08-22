import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { AuthService } from 'apps/main-api/src/auth/auth.service';
import { UserService } from 'apps/main-api/src/user/user.service';
import { ClientProxy } from '@nestjs/microservices';
import { otpRequestedEvent } from '@app/contracts';

@Injectable()
export class PhoneauthService {
    private redisClient:Redis

    constructor(
        @Inject('NOTIFICATIONS_SERVICE') private readonly clientProxy:ClientProxy,
        private readonly configService:ConfigService,
        private readonly authService:AuthService,
        private readonly userService:UserService
        
    ){
        this.redisClient=new Redis({
            host:this.configService.get<string>('REDIS_HOST') || 'localhost',
            port:this.configService.get<number>('REDIS_PORT') || 6379,
            password:this.configService.get<string>('REDIS_PASSWORD')
        })
    }
    public async sendOtp(identifier:string,type:'phone' | 'email'):Promise<void>{
        const otp=Math.floor(1000+Math.random()*9000).toString()

        await this.redisClient.set(`otp:${identifier}`,otp,'EX',180)
        
        const payload:otpRequestedEvent={
            identifier:identifier,
            code:otp,
            type:type
        }
            this.clientProxy.emit('auth.otp.requested',payload)
        

    }

    public async verifyOtpAndLogin(identifier: string, code: string) {
    const otpKey=`otp:${identifier}`
    const attemptKey=`otp_attempts:${identifier}`
    const attempts=await this.redisClient.get(attemptKey)
    if(attempts && Number(attempts)>=3){
        throw new BadRequestException('Забагато невдалих спроб. Запитуйте новий код.');
    }

    const saveOtp = await this.redisClient.get(otpKey);

    if (!saveOtp) {
        throw new BadRequestException('Код не знайдено або термін дії минув');
    }

    if (saveOtp !== code) {
        await this.redisClient.incr(attemptKey)
        await this.redisClient.expire(attemptKey,180)
        throw new BadRequestException('Неправильний код підтвердження');
    }

    await this.redisClient.del(otpKey);
    await this.redisClient.del(attemptKey)

    const isEmail = identifier.includes('@');

    let user = isEmail 
        ? await this.userService.findByEmail(identifier) 
        : await this.userService.findUserByPhoneNumber(identifier);

    if (!user) {
        user = await this.userService.createUser(
            isEmail ? identifier : null, 
            !isEmail ? identifier : null,
            null,
            'user',
            true,
            null
        );
    }
    return this.authService.saveSession(user);
}
}
