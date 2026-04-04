import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageableType } from './image.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() dto: CreateImageDto) {
    return this.imagesService.create(dto);
  }

  @Public()
  @Get(':type/:id')
  findByEntity(@Param('type') type: ImageableType, @Param('id') id: string) {
    return this.imagesService.findByEntity(type, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }
}
