import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { Tag } from '../tags/tag.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  brand: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  basePrice: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  salePrice: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  costPerItem: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ default: false })
  dynamicPricing: boolean;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToMany(() => Category, (category) => category.products, { eager: true })
  @JoinTable({ name: 'product_categories' })
  categories: Category[];

  @ManyToMany(() => Tag, (tag) => tag.products, { eager: true })
  @JoinTable({ name: 'product_tags' })
  tags: Tag[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
