import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShippingMethod } from '../enums/shipping-method.enum';
import { Order } from './order.entity';

@Entity('order_shipping')
export class OrderShipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.shipping, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'recipient_name' })
  recipientName: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column({ default: 'MX' })
  country: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    name: 'shipping_method',
    type: 'enum',
    enum: ShippingMethod,
    default: ShippingMethod.STANDARD,
  })
  shippingMethod: ShippingMethod;

  @Column({ name: 'tracking_number', nullable: true })
  trackingNumber?: string;
}
