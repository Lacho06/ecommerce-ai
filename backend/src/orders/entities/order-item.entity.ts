import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/product.entity';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, { onDelete: 'SET NULL', nullable: true, eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

  @Column({ name: 'product_name' })
  productName: string;

  @Column({ name: 'product_sku' })
  productSku: string;

  @Column({ name: 'unit_price', type: 'numeric', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ name: 'currency_code', length: 3 })
  currencyCode: string;

  @Column({ name: 'currency_name' })
  currencyName: string;

  @Column({ name: 'currency_symbol', length: 5 })
  currencySymbol: string;

  @Column({ name: 'base_currency_code', length: 3 })
  baseCurrencyCode: string;

  @Column({ name: 'base_currency_symbol', length: 5 })
  baseCurrencySymbol: string;

  @Column({ name: 'exchange_rate', type: 'numeric', precision: 18, scale: 8, default: 1 })
  exchangeRate: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}
