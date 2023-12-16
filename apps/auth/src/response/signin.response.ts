import { ApiProperty } from '@nestjs/swagger';

export class SigninResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty({
    example: 'aaronlab.net@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'SuperDuperFancyToken',
  })
  accessToken: string;
}
