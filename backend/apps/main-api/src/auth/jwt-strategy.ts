import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService:ConfigService){
        const secret=configService.get<string>('JWT_SECRET')

        super({
            jwtFromRequest:ExtractJwt.fromExtractors([
            (req:Request)=>{
                return req?.cookies?.accessToken
            }
            ]),
            ignoreExpiration:false,
            secretOrKey:secret || 'secret'
        })
    }
   async validate(payload:any) {
       return {userId:payload.sub,email:payload.email}
   }
}