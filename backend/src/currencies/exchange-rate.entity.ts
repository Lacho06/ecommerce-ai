import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Currency } from './currency.entity';

@Entity('exchange_rates')
@Unique(['fromCurrency', 'toCurrency', 'effectiveDate'])
@Check(`"from_currency_id" != "to_currency_id"`)
@Check(`"rate" > 0`)
export class ExchangeRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Currency, { onDelete: 'RESTRICT', nullable: false, eager: true })
  @JoinColumn({ name: 'from_currency_id' })
  fromCurrency: Currency;

  @ManyToOne(() => Currency, { onDelete: 'RESTRICT', nullable: false, eager: true })
  @JoinColumn({ name: 'to_currency_id' })
  toCurrency: Currency;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  rate: number;

  @Column({ name: 'effective_date', type: 'date' })
  effectiveDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
