import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
  @ApiProperty({
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  readonly cvc: string;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  readonly expMonth: number;

  @ApiProperty({
    example: 2025,
  })
  @IsNumber()
  readonly expYear: number;

  @ApiProperty({
    example: '4242424242424242',
  })
  @IsString()
  readonly number: string;
}
