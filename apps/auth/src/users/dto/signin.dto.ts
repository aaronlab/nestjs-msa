import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    example: 'aaronlab.net@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'superDuperSecretPassword!123$',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
