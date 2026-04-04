import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePayformDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  provider: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
