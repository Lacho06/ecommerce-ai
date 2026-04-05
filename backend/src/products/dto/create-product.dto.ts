import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsString()
  brand: string;

  @IsOptional()
  @IsUUID()
  currencyId?: string;

  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  basePrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  salePrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  initialStock?: number;

  @IsOptional()
  @IsBoolean()
  dynamicPricing?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagNames?: string[];
}
