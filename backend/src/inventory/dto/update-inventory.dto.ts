import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInventoryDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  remaining?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  available?: number;
}
