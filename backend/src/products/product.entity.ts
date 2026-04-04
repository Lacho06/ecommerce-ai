import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { Inventory } from '../inventory/inventory.entity';
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

  @OneToOne(() => Inventory, (inventory) => inventory.product, { eager: true })
  inventory: Inventory;

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
