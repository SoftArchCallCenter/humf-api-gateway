import { HttpService } from '@nestjs/axios';
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { SignupUserDto } from 'src/users/dto/signup-user.dto';
const Flatted = require('flatted');

@Injectable()
export class AuthService {
    constructor( 
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async signup(userData: SignupUserDto): Promise<any> {
        try {
            const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
            const signupUrl = `${authServiceUrl}/auth/signup`;
            const response = await firstValueFrom(this.httpService.post(signupUrl, userData));            

            if (response.status === HttpStatus.CREATED) {
                return response.data;
            } else {
                throw new HttpException('User signup failed 1', response.status);
            }
        } catch (error) {
            throw new HttpException('User signup failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(credentials: LoginUserDto): Promise<any> {
        try {
            const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
            const loginUrl = `${authServiceUrl}/auth/login`;
            const response = await firstValueFrom(this.httpService.post(loginUrl, credentials));
            
            if (response.status === HttpStatus.CREATED) {
                return response.data;
            } else {
                // Handle unexpected status codes
                throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            // Handle other errors such as network issues or timeouts
            throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
