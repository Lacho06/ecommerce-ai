import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { Currency } from './currency.entity';
import { ExchangeRate } from './exchange-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Currency, ExchangeRate])],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
