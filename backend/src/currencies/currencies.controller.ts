import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  // ── Currencies ──

  @Post()
  create(@Body() dto: CreateCurrencyDto) {
    return this.currenciesService.createCurrency(dto);
  }

  @Public()
  @Get()
  findActive() {
    return this.currenciesService.findActiveCurrencies();
  }

  @Get('all')
  findAll() {
    return this.currenciesService.findAllCurrencies();
  }

  @Patch(':id/toggle')
  toggleActive(@Param('id') id: string) {
    return this.currenciesService.toggleActive(id);
  }

  // ── Exchange Rates ──

  @Post('exchange-rates')
  createRate(@Body() dto: CreateExchangeRateDto) {
    return this.currenciesService.createRate(dto);
  }

  @Public()
  @Get('exchange-rates/:from/:to')
  getLatestRate(@Param('from') from: string, @Param('to') to: string) {
    return this.currenciesService.getLatestRate(from, to);
  }

  @Public()
  @Get('convert')
  convert(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: string,
  ) {
    return this.currenciesService.convert(from, to, Number(amount));
  }
}
