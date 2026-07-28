import { 
  BadRequestException, 
  Body, 
  Controller, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Param, 
  Post, 
  Query, 
  Req, 
  Res, 
  UnauthorizedException, 
  UseGuards 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/loginDto';
import { AuthProviderGuard } from './guards/provider.guard';
import { ProviderService } from './provider/provider.service';
import { type Request, type Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly providerService: ProviderService,
    private readonly configService: ConfigService
  ) {}

  private setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 1 * 60 * 60 * 1000 
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
  }

  private clearAuthCookies(res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: loginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    
    const { user, accessToken, refreshToken } = await this.authService.login(dto);

    this.setAuthCookies(res, accessToken, refreshToken);

    return { message: 'Успішний вхід', user };
  }

  @UseGuards(AuthProviderGuard)
  @Get('/oauth/callback/:provider')
  public async callback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
    @Param('provider') provider: string
  ) {
    if (!code) {
      throw new BadRequestException('Не надано код авторизації');
    }

    const { accessToken, refreshToken } = await this.authService.extractProfileFromCode(req, provider, code);

    this.setAuthCookies(res, accessToken, refreshToken);

    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    return res.redirect(frontendUrl);
  }

  @UseGuards(AuthProviderGuard)
  @Get('/oauth/connect/:provider')
  public async connect(@Param('provider') provider: string) {
    const providerInstance = this.providerService.findByService(provider);
    return {
      url: providerInstance?.getAuthUrl()
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.clearAuthCookies(res);
    return { message: 'Користувач успішно вийшов' };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
  
    const refreshTokenFromCookie = req.cookies['refreshToken'];

    if (!refreshTokenFromCookie) {
      throw new UnauthorizedException('Refresh токен відсутній у куках');
    }

    const { accessToken, refreshToken } = await this.authService.refresh({ refreshToken: refreshTokenFromCookie });

    this.setAuthCookies(res, accessToken, refreshToken);

    return { message: 'Токени успішно оновлено' };
  }

  @Get('me')
  async getMe(@Req() req:Request){
    const token=await req.cookies['accessToken']

    if(!token){
      throw new UnauthorizedException('токе відсутній в куках')
    }

    return this.authService.getMe(token)
  }
}