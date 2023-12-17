import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '@app/common/decorators';
import { UserDocument } from '@app/common/models';
import { SigninDto } from './users/dto/signin.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: '로그인',
  })
  @Post('/signin')
  async signin(
    @CurrentUser() user: UserDocument,
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.signin(user, res);
    res.send({
      ...user,
      token: accessToken,
    });
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
