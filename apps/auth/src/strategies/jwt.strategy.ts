import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) =>
          req?.cookies?.Authentication ??
          req?.headers?.authorization ??
          req?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate({ userId }: ITokenPayload) {
    return this.userService.getUser({
      _id: userId,
    });
  }
}
