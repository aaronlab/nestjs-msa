import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'aaronlab.net@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'superDuperSecretPassword',
  })
  @IsStrongPassword()
  password: string;
}
