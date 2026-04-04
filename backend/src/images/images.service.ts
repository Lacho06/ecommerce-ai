import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { Image, ImageableType } from './image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
  ) {}

  async create(dto: CreateImageDto): Promise<Image> {
    const image = this.imageRepo.create(dto);
    return this.imageRepo.save(image);
  }

  async findByEntity(imageableType: ImageableType, imageableId: string): Promise<Image[]> {
    return this.imageRepo.find({ where: { imageableType, imageableId } });
  }

  async remove(id: string): Promise<void> {
    const image = await this.imageRepo.findOneBy({ id });
    if (!image) throw new NotFoundException(`Image ${id} not found`);
    await this.imageRepo.remove(image);
  }
}
