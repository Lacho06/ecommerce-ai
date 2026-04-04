import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UserAddress } from './user-address.entity';

@Injectable()
export class UserAddressesService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly addressRepo: Repository<UserAddress>,
  ) {}

  async create(userId: string, dto: CreateUserAddressDto): Promise<UserAddress> {
    if (dto.isDefault) {
      await this.addressRepo.update(
        { user: { id: userId } },
        { isDefault: false },
      );
    }
    const address = this.addressRepo.create({
      ...dto,
      country: dto.country ?? 'MX',
      user: { id: userId },
    });
    return this.addressRepo.save(address);
  }

  async findByUser(userId: string): Promise<UserAddress[]> {
    return this.addressRepo.find({ where: { user: { id: userId } } });
  }

  async findOne(id: string, userId: string): Promise<UserAddress> {
    const address = await this.addressRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!address) throw new NotFoundException(`Address ${id} not found`);
    return address;
  }

  async remove(id: string, userId: string): Promise<void> {
    const address = await this.findOne(id, userId);
    await this.addressRepo.remove(address);
  }
}
