import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/category.entity';
import { CurrenciesModule } from '../currencies/currencies.module';
import { Inventory } from '../inventory/inventory.entity';
import { Tag } from '../tags/tag.entity';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Tag, Inventory]),
    CurrenciesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
