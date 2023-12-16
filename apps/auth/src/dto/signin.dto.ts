import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    example: 'aaronlab.net@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'superDuperSecretPassword!123$',
  })
  @IsStrongPassword()
  password: string;
}
