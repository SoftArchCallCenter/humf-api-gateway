import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import * as express from 'express';
import { catchError, map } from 'rxjs';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { SignupUserDto } from 'src/auth/dto/signup-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async signup(userData: SignupUserDto): Promise<any> {
    const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    const signupUrl = `${authServiceUrl}/auth/signup`;

    return this.httpService
      .post(signupUrl, userData)
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  async login(credentials: LoginUserDto): Promise<any> {
    const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    const loginUrl = `${authServiceUrl}/auth/login`;

    return this.httpService
      .post(loginUrl, credentials)
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  async logout(request: express.Request): Promise<any> {
    const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    const logoutUrl = `${authServiceUrl}/auth/logout`;

    const jwtToken = request.headers.authorization;
    const headers = {
      Authorization: jwtToken,
    };

    return this.httpService
      .post(logoutUrl, {}, { headers })
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  async refreshTokens(request: express.Request): Promise<any> {
    const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    const refreshTokensUrl = `${authServiceUrl}/auth/refresh`;

    const jwtToken = request.headers.authorization;
    const headers = {
      Authorization: jwtToken,
    };

    return this.httpService
      .post(refreshTokensUrl, {}, { headers })
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }
}
