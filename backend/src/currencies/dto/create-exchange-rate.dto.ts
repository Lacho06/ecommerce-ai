import { IsDateString, IsNumber, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExchangeRateDto {
  @IsUUID()
  fromCurrencyId: string;

  @IsUUID()
  toCurrencyId: string;

  @IsNumber()
  @Min(0.00000001)
  @Type(() => Number)
  rate: number;

  @IsDateString()
  effectiveDate: string;
}
