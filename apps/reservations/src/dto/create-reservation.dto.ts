import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChargeDto } from '@app/common/dto';

export class CreateReservationDto {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  readonly startDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  readonly endDate: Date;

  @ApiProperty()
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  readonly charge: CreateChargeDto;
}
