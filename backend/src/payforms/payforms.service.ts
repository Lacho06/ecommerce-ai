import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePayformDto } from './dto/create-payform.dto';
import { Payform } from './payform.entity';

@Injectable()
export class PayformsService {
  constructor(
    @InjectRepository(Payform)
    private readonly payformRepo: Repository<Payform>,
  ) {}

  async create(dto: CreatePayformDto): Promise<Payform> {
    const existing = await this.payformRepo.findOneBy({ code: dto.code });
    if (existing) throw new ConflictException(`El código '${dto.code}' ya existe`);
    const payform = this.payformRepo.create({ ...dto, isActive: dto.isActive ?? true });
    return this.payformRepo.save(payform);
  }

  async findAll(): Promise<Payform[]> {
    return this.payformRepo.find();
  }

  async findActive(): Promise<Payform[]> {
    return this.payformRepo.findBy({ isActive: true });
  }

  async findOne(id: string): Promise<Payform> {
    const payform = await this.payformRepo.findOneBy({ id });
    if (!payform) throw new NotFoundException(`Payform ${id} not found`);
    return payform;
  }

  async toggleActive(id: string): Promise<Payform> {
    const payform = await this.findOne(id);
    payform.isActive = !payform.isActive;
    return this.payformRepo.save(payform);
  }
}
