import { IsIn, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderStatusDto {
  @IsIn(Object.values(OrderStatus))
  status: OrderStatus;

  @IsOptional()
  @IsString()
  note?: string;
}
