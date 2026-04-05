import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { CreateOrderShippingDto } from '../../orders/dto/create-order.dto';

export class CheckoutCartDto {
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
