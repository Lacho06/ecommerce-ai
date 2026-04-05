import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Currency } from './currency.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { ExchangeRate } from './exchange-rate.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
    @InjectRepository(ExchangeRate)
    private readonly rateRepo: Repository<ExchangeRate>,
  ) {}

  // ── Currencies ──

  async createCurrency(dto: CreateCurrencyDto): Promise<Currency> {
    const existing = await this.currencyRepo.findOneBy({ code: dto.code.toUpperCase() });
    if (existing) throw new ConflictException(`La moneda '${dto.code}' ya existe`);

    if (dto.isDefault) {
      await this.currencyRepo.update({}, { isDefault: false });
    }

    const currency = this.currencyRepo.create({
      ...dto,
      code: dto.code.toUpperCase(),
      decimalPlaces: dto.decimalPlaces ?? 2,
      isDefault: dto.isDefault ?? false,
      isActive: dto.isActive ?? true,
    });
    return this.currencyRepo.save(currency);
  }

  async findAllCurrencies(): Promise<Currency[]> {
    return this.currencyRepo.find({ order: { code: 'ASC' } });
  }

  async findActiveCurrencies(): Promise<Currency[]> {
    return this.currencyRepo.find({
      where: { isActive: true },
      order: { code: 'ASC' },
    });
  }

  async findCurrency(id: string): Promise<Currency> {
    const currency = await this.currencyRepo.findOneBy({ id });
    if (!currency) throw new NotFoundException(`Currency ${id} not found`);
    return currency;
  }

  async findDefault(): Promise<Currency> {
    const currency = await this.currencyRepo.findOneBy({ isDefault: true });
    if (!currency)
      throw new NotFoundException('No hay moneda por defecto configurada');
    return currency;
  }

  async toggleActive(id: string): Promise<Currency> {
    const currency = await this.findCurrency(id);
    currency.isActive = !currency.isActive;
    return this.currencyRepo.save(currency);
  }

  // ── Exchange Rates ──

  async createRate(dto: CreateExchangeRateDto): Promise<ExchangeRate> {
    if (dto.fromCurrencyId === dto.toCurrencyId) {
      throw new BadRequestException('Las monedas de origen y destino deben ser diferentes');
    }

    const [from, to] = await Promise.all([
      this.findCurrency(dto.fromCurrencyId),
      this.findCurrency(dto.toCurrencyId),
    ]);

    const rate = this.rateRepo.create({
      fromCurrency: from,
      toCurrency: to,
      rate: dto.rate,
      effectiveDate: dto.effectiveDate,
    });

    try {
      return await this.rateRepo.save(rate);
    } catch (err) {
      if (err instanceof QueryFailedError && (err as any).code === '23505') {
        throw new ConflictException(
          `Ya existe una tasa de cambio para ${from.code} → ${to.code} en la fecha ${dto.effectiveDate}`,
        );
      }
      throw err;
    }
  }

  async getLatestRate(fromCode: string, toCode: string): Promise<ExchangeRate> {
    const rate = await this.rateRepo.findOne({
      where: {
        fromCurrency: { code: fromCode.toUpperCase() },
        toCurrency: { code: toCode.toUpperCase() },
      },
      order: { effectiveDate: 'DESC' },
    });
    if (!rate) {
      throw new NotFoundException(`No hay tasa de cambio para ${fromCode} → ${toCode}`);
    }
    return rate;
  }

  /**
   * Convierte un monto entre monedas usando aritmética de centavos.
   *
   * 1. Convierte el monto a centavos (× 10^decimalPlaces de la moneda origen)
   * 2. Aplica la tasa: centavos × rate
   * 3. Ajusta por diferencia de decimales entre monedas
   * 4. Devuelve el monto en la unidad de la moneda destino
   */
  async convert(
    fromCode: string,
    toCode: string,
    amount: number,
  ): Promise<{ from: string; to: string; rate: number; original: number; converted: number }> {
    const rateEntity = await this.getLatestRate(fromCode, toCode);
    const rate = Number(rateEntity.rate);

    const fromDecimals = rateEntity.fromCurrency.decimalPlaces;
    const toDecimals = rateEntity.toCurrency.decimalPlaces;

    // Aritmética en centavos
    const fromFactor = Math.pow(10, fromDecimals);
    const toFactor = Math.pow(10, toDecimals);

    const amountCents = Math.round(amount * fromFactor);
    const convertedCents = Math.round(amountCents * rate * (toFactor / fromFactor));
    const converted = convertedCents / toFactor;

    return {
      from: fromCode.toUpperCase(),
      to: toCode.toUpperCase(),
      rate,
      original: amount,
      converted,
    };
  }
}
