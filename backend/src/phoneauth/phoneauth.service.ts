import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PhoneauthService {
    private redisClient:Redis

    constructor(
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
    public async sendOtp(phone:string):Promise<void>{
        const otp=Math.floor(1000+Math.random()*9000).toString()

        await this.redisClient.set(`otp:${phone}`,otp,'EX',180)

        console.log(`Код ${otp} згенеровано для номеру ${phone}.`)
    }

    public async verifyOtpAndLogin(phone:string,code:string){
        const saveOtp=await this.redisClient.get(`otp:${phone}`)

        if(!saveOtp){
            throw new BadRequestException('Код не знайдено або термін дії минув')
        }

        if(saveOtp!==code){
            throw new BadRequestException('Неправильний код підтвердження')
        }

        await this.redisClient.del(`otp:${phone}`)

        let user=await this.userService.findUserByPhoneNumber(phone)

        if(!user){
            user=await this.userService.createUser(
                null,
                phone,
                null,
                'user',
                true,
                null
            )
        }
        return this.authService.saveSession(user)
     }
}
