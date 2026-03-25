import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
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

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  costPerItem: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock: number;

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
