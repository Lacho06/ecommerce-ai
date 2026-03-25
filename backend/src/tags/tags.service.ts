import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly repo: Repository<Tag>,
  ) {}

  findAll(): Promise<Tag[]> {
    return this.repo.find();
  }

  create(name: string): Promise<Tag> {
    return this.repo.save(this.repo.create({ name }));
  }
}
