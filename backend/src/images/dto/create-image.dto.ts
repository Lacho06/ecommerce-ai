import { IsIn, IsString } from 'class-validator';
import { ImageableType } from '../image.entity';

export class CreateImageDto {
  @IsString()
  url: string;

  @IsString()
  imageableId: string;

  @IsIn(['product', 'category', 'user'])
  imageableType: ImageableType;
}
