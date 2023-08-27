import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customzie.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { IUser } from './user.interface';
import { Request, Response } from 'express';
import { GoogleOAuthGuard } from './google-oauth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ResponseMessage('User register')
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ResponseMessage('User login')
  async login(@User() user: IUser, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(user, res);
  }

  @Post('logout')
  @ResponseMessage('User logout')
  async logout(@User() user: IUser, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(user, res);
  }

  @Post('refresh')
  @ResponseMessage('Refresh token')
  async refresh( @Res({ passthrough: true }) res: Response, @Req() request: Request) {
    const refreshToken = request.cookies['refreshToken'];
    return this.authService.refresh( res, refreshToken);
  }

  @Public()
  @Post('forget-password')
  @ResponseMessage('Send mail to reset password')
  async forget(@Body() body: any) {
    return this.authService.forget(body.email);
  }

  @Public()
  @Post('reset-password/:token')
  @ResponseMessage('Reset password')
  async resetPass(@Body() body: any, @Param('token') token: string) {
    return this.authService.resetPass(body.password,token);
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Public()
  @Get('google-redirect')
  @ResponseMessage('Google login')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    
    return this.authService.passportLogin(req.user, res);
  }

    @Public()
  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }
  @Public()
  @Get("/facebook-redirect")
  @ResponseMessage('Facebook login')
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.passportLogin(req.user.user, res);
  }
}
