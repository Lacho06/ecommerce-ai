import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Inventory } from '../inventory/inventory.entity';
import { Tag } from '../tags/tag.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
  ) {}

  private async findOrCreateCategory(name: string): Promise<Category> {
    let category = await this.categoryRepo.findOneBy({ name });
    if (!category) {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      category = await this.categoryRepo.save(
        this.categoryRepo.create({ name, slug }),
      );
    }
    return category;
  }

  private async findOrCreateTag(name: string): Promise<Tag> {
    let tag = await this.tagRepo.findOneBy({ name });
    if (!tag) {
      tag = await this.tagRepo.save(this.tagRepo.create({ name }));
    }
    return tag;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const existing = await this.productRepo.findOneBy({ sku: dto.sku });
    if (existing) throw new ConflictException(`El SKU '${dto.sku}' ya existe`);

    const product = this.productRepo.create({
      name: dto.name,
      sku: dto.sku,
      brand: dto.brand,
      basePrice: dto.basePrice,
      salePrice: dto.salePrice ?? null,
      dynamicPricing: dto.dynamicPricing ?? false,
      description: dto.description ?? null,
    });

    if (dto.categoryName) {
      const category = await this.findOrCreateCategory(dto.categoryName);
      product.categories = [category];
    } else {
      product.categories = [];
    }

    if (dto.tagNames?.length) {
      product.tags = await Promise.all(
        dto.tagNames.map((n) => this.findOrCreateTag(n)),
      );
    } else {
      product.tags = [];
    }

    const savedProduct = await this.productRepo.save(product);

    const initialStock = dto.initialStock ?? 0;
    const inventory = this.inventoryRepo.create({
      product: savedProduct,
      stock: initialStock,
      remaining: initialStock,
      available: initialStock > 0 ? initialStock : 0,
    });
    await this.inventoryRepo.save(inventory);

    return this.productRepo.findOne({
      where: { id: savedProduct.id },
    }) as Promise<Product>;
  }

  async findAll(page: number, perPage: number) {
    const [data, total] = await this.productRepo.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });
    return { data, total, page, perPage };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }
}
