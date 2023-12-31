import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'aaronlab.net@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'superDuperSecretPassword!123$',
  })
  @IsStrongPassword()
  readonly password: string;
}
