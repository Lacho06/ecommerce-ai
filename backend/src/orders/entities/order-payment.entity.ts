import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payform } from '../../payforms/payform.entity';
import { PaymentStatus } from '../enums/payment-status.enum';
import { Order } from './order.entity';

@Entity('order_payments')
export class OrderPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.payment, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Payform, {
    onDelete: 'RESTRICT',
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'payform_id' })
  payform: Payform;

  @Column({ name: 'payform_name' })
  payformName: string;

  @Column({ name: 'payform_code' })
  payformCode: string;

  @Column({ name: 'payform_provider', nullable: true })
  payformProvider?: string;

  @Column({ name: 'last_four', length: 4, nullable: true })
  lastFour?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ name: 'transaction_id', nullable: true })
  transactionId?: string;

  @Column({ name: 'paid_at' })
  paidAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
