import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserAddressDto {
  @IsOptional()
  @IsString()
  label?: string;

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
  @IsBoolean()
  isDefault?: boolean;
}
