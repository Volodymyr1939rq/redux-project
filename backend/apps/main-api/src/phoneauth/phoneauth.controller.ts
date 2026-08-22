import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { PhoneauthService } from './phoneauth.service';
import { type Response } from 'express';
import { SendCodeDto } from './SendCode.dto';
import { VerifyCodeDto } from './VerifyCode.dto';
import {ThrottlerGuard,Throttle} from '@nestjs/throttler'

@Controller('phoneauth')
@UseGuards(ThrottlerGuard)
export class PhoneauthController {
  constructor(private readonly phoneauthService: PhoneauthService) {}

  private setAuthCookies(res:Response,accessToken:string,refreshToken:string){
    const isProduction=process.env.NODE_ENV==='production'

    res.cookie('accessToken',accessToken,{
      httpOnly:true,secure:isProduction,sameSite:'lax',maxAge:1*60*60*1000
    })
    res.cookie('refreshToken',refreshToken,{
      httpOnly:true,secure:isProduction,sameSite:'lax',maxAge:7*24*60*60*1000
    })
  }

  @Post('send')
  @HttpCode(HttpStatus.OK)
  @Throttle({default:{limit:1,ttl:60}})
  async sendCode(@Body() dto:SendCodeDto){
    
      await this.phoneauthService.sendOtp(dto.identifier,'phone')
      
      return {message:'Код відправлено в SMS'}
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyCode(
    @Body() dto:VerifyCodeDto,
    @Res({passthrough:true}) res:Response
   ){
    
     const {accessToken,refreshToken,user}=await this.phoneauthService.verifyOtpAndLogin(dto.identifier,dto.code)
     this.setAuthCookies(res,accessToken,refreshToken)

     return {message:'Успішний вхід за номером телефону',user}
  }
}
