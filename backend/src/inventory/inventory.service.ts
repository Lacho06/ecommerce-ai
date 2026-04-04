import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
  ) {}

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepo.find({ relations: ['product'] });
  }

  async findByProductId(productId: string): Promise<Inventory> {
    const inventory = await this.inventoryRepo.findOne({
      where: { product: { id: productId } },
      relations: ['product'],
    });
    if (!inventory) throw new NotFoundException(`Inventory for product ${productId} not found`);
    return inventory;
  }

  async update(id: string, dto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.inventoryRepo.findOneBy({ id });
    if (!inventory) throw new NotFoundException(`Inventory ${id} not found`);
    Object.assign(inventory, dto);
    return this.inventoryRepo.save(inventory);
  }
}
