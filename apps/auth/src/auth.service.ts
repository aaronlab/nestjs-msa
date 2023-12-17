import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { UserDocument } from '@app/common/models';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async signin(user: UserDocument, res: Response) {
    const payload: ITokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.get<number>('JWT_EXPIRATION') * 24 * 60 * 60,
    );

    const token = this.jwtService.sign(payload);

    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }
}
