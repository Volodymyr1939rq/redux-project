import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'apps/main-api/src/user/user.service';
import { loginDto } from './dto/loginDto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { refreshTokenDto } from './dto/refreshTokenDto';
import { Request } from 'express';
import { ProviderService } from './provider/provider.service';
import { PrismaService } from 'apps/main-api/src/prisma.service';
import { AuthProvider, User } from '@prisma/client';


@Injectable()
export class AuthService {
    public constructor(private readonly userService:UserService,
        private readonly jwtService:JwtService,
        private readonly configService:ConfigService,
        private readonly providerService:ProviderService,
        private readonly prismaService:PrismaService
    ){}
    
    public async saveSession(user:Pick<User,'id' |'email'|'name'| 'phone'| 'picture' | 'role'>){
        const tokens=await this.generateToken(user.id,user.email)
        const hashedRefreshToken=await hash(tokens.refreshToken)

        await this.userService.update(user.id,{
            hashedRefreshToken
        })

        return {
            user:{
                id:user.id,
                email:user.email,
                name:user.name,
                phone:user.phone,
                picture:user.picture,
                role:user.role
            },
            ...tokens
        }
    }

    async login(dto:loginDto){
        const user=await this.userService.findByEmail(dto.email)

        if(!user || !user.password){
            throw new NotFoundException('Користувач не знайдений.Перевірте введені дані')
        }

        const isValidPassword=await verify(user.password,dto.password)

        if(!isValidPassword){
            throw new UnauthorizedException('Неправильний пароль.Попробуйте знову')
        }

        return this.saveSession(user)
    }

     private async generateToken(userId:string,email:string | null){
        const payload={sub:userId,email}
        const secret=this.configService.get<string>('JWT_SECRET')

        const [accessToken,refreshToken]=await Promise.all([
            this.jwtService.signAsync(payload,{
                expiresIn:'15m',
                secret:secret
            }),
            this.jwtService.signAsync(payload,{
                expiresIn:'7d',
                secret:secret
            })
        ])
        return {accessToken,refreshToken}
    }

    async refresh(dto:refreshTokenDto) {
        try {
          
            const payload = await this.jwtService.verifyAsync(dto.refreshToken, {
                secret: this.configService.get<string>('JWT_SECRET') 
            });
            
            const user = await this.userService.getUserById(payload.sub);

            if (!user || !user.hashedRefreshToken) {
                throw new UnauthorizedException("Access denied");
            }
            
            const compareTokens = await verify(user.hashedRefreshToken, dto.refreshToken);
            if (!compareTokens) {
                throw new UnauthorizedException("Access denied");
            }
            
            return this.saveSession(user)

        } catch (error) {
            throw new UnauthorizedException("Invalid or Expired Refresh Token");
        }
    }
    async logout(userId:string){
       await this.userService.update(userId,{
        hashedRefreshToken:null
       })
       return {message:'Ви успішно вийшли з акаунту'}
    }
    
    public async extractProfileFromCode(req:Request,provider:string,code:string){
        const providerInstance=this.providerService.findByService(provider)
        if(!providerInstance){
            throw new BadRequestException(`Провайдер ${provider} не знайдений`)
        }
        const profile=await providerInstance.findUserByCode(code)
        if(!profile){
            throw new BadRequestException('Не вдалося отримати дані профілю від провайдера')
        }
        const account=await this.prismaService.account.findFirst({
            where:{
                providerId:profile.id,
                provider:profile.provider.toUpperCase() as AuthProvider
            }
        })
        const user=account?.userId
        ? await this.userService.getUserById(account.userId)
        : null

        if(user){
            return this.saveSession(user)
        }

        const newUser=await this.userService.createUser(
            profile.email,
            null,
            profile.picture,
            profile.name,
            true,
            null,
        )

        if(!account){
            await this.prismaService.account.create({
                data:{
                    userId:newUser.id,
                    provider:profile.provider.toUpperCase() as AuthProvider,
                    providerId:profile.id
                }
            })
        }
        return this.saveSession(newUser)
    }

    public async getMe(token:string){
        try {
            const payload=await this.jwtService.verifyAsync(token,{
            secret:this.configService.get<string>('JWT_SECRET')
        })

        const user=await this.userService.getUserById(payload.sub)

        if(!user){
            throw new UnauthorizedException('Користувач не знайдений')
        }

        return {
            id:user.id,
            email:user.email,
            name:user.name,
            phone:user.phone,
            picture:user.picture,
            role:user.role
        }
        } catch (error) {
            throw new UnauthorizedException('Недійсний токен')
        }
        
    }
}
