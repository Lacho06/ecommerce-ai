import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCurrencyDto {
  @IsString()
  @Length(3, 3)
  code: string;

  @IsString()
  name: string;

  @IsString()
  @Length(1, 5)
  symbol: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  decimalPlaces?: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
