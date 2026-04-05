import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItem } from './order-item.entity';
import { OrderPayment } from './order-payment.entity';
import { OrderShipping } from './order-shipping.entity';
import { OrderStatusHistory } from './order-status-history.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_number', unique: true })
  orderNumber: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ name: 'shipping_cost', type: 'numeric', precision: 10, scale: 2, default: 0 })
  shippingCost: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'currency_code', length: 3 })
  currencyCode: string;

  @Column({ name: 'currency_name' })
  currencyName: string;

  @Column({ name: 'currency_symbol', length: 5 })
  currencySymbol: string;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  items: OrderItem[];

  @OneToMany(() => OrderStatusHistory, (history) => history.order, { cascade: true })
  statusHistory: OrderStatusHistory[];

  @OneToOne(() => OrderPayment, (payment) => payment.order, { cascade: true, eager: true })
  payment: OrderPayment;

  @OneToOne(() => OrderShipping, (shipping) => shipping.order, { cascade: true, eager: true })
  shipping: OrderShipping;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
