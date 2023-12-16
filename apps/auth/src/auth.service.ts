import { Injectable } from '@nestjs/common';
import { UserDocument } from './models/users.schema';
import { Response, response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { SigninResponse } from './response/signin.response';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async signin(signinDto: SigninDto): Promise<SigninResponse> {
    const user = await this.usersService.verifyUser(
      signinDto.email,
      signinDto.password,
    );

    const payload = {
      email: signinDto.email,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.get('JWT_EXPIRATION') * 24 * 60 * 60,
    );

    const token = this.jwtService.sign(payload);

    return {
      email: user.email,
      token,
    };
  }
}
