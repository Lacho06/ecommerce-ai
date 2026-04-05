import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ShippingMethod } from '../enums/shipping-method.enum';

export class CreateOrderItemDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}

export class CreateOrderShippingDto {
  @IsString()
  recipientName: string;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsIn(Object.values(ShippingMethod))
  shippingMethod?: ShippingMethod;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @IsUUID()
  payformId: string;

  @IsOptional()
  @IsUUID()
  currencyId?: string;

  @IsOptional()
  @IsString()
  lastFour?: string;

  @ValidateNested()
  @Type(() => CreateOrderShippingDto)
  shipping: CreateOrderShippingDto;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  shippingCost?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  tax?: number;
}
