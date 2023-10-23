import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { SignupUserDto } from 'src/auth/dto/signup-user.dto';
import { Public } from 'src/common/decorators';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupUserDto: SignupUserDto) {
    return this.authService.signup(signupUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // @Post('logout')
  // logout(@Res() res: express.Response) {
  //   // console.log(res);
  // }
  // @Public()
  // @Redirect(logoutUrl, 307)
  // @Post('logout')
  // async logout(@Res() response: express.Response) {
  //   // const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
  //   // const logoutUrl = `${authServiceUrl}/auth/logout`;
  //   console.log("send logout");
  //   const logoutUrl = `http://127.0.0.1:5001/auth/logout`;
  //   return response.redirect(307, logoutUrl);
  // }
  @Post('logout')
  async logout(
    @Req() request: express.Request,
    @Res() response: express.Response,
  ) {
    const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    const logoutUrl = `${authServiceUrl}/auth/logout`;

    console.log(logoutUrl);
    

    // Extract the Authorization header from the current request
    const authorizationHeader = request.headers['authorization'];

    // Set the Authorization header for the redirect
    if (authorizationHeader) {
      response.setHeader('Authorization', authorizationHeader);
    }
    console.log("send", authorizationHeader);
    console.log(response)
        
    // Perform the redirect with the header included
    // return response.status(200);
    return response.redirect(308, logoutUrl);
  }
  
  // @Public()
  // @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // refreshTokens(
  //   @GetCurrentUserId() userId: number,
  //   @GetCurrentUser('refreshToken') refreshToken: string,
  // ): Promise<Tokens> {
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
