import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

    async signup(userData: SignupUserDto): Promise<Observable<any>> {
        const authServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
        const signupUrl = `${authServiceUrl}/auth/signup`;
        const response =  await firstValueFrom(this.httpService.post(signupUrl, userData));
        return response.data;
    }

    async login(credentials: LoginUserDto): Promise<Observable<any>> {
        const authServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
        const loginUrl = `${authServiceUrl}/auth/login`;
        const response =  await firstValueFrom(this.httpService.post(loginUrl, credentials));
        return response.data;
    }
}
