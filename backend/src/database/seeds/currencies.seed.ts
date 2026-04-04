import { DataSource } from 'typeorm';
import { Currency } from '../../currencies/currency.entity';

export async function seedCurrencies(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Currency);

  const exists = await repo.findOneBy({ code: 'USD' });
  if (exists) {
    console.log('⚠️  La moneda USD ya existe, omitiendo.');
    return;
  }

  await repo.save(
    repo.create({
      code: 'USD',
      name: 'Dólar Estadounidense',
      symbol: 'US$',
      decimalPlaces: 2,
      isDefault: true,
      isActive: true,
    }),
  );
  console.log('✅ Moneda creada: USD (Dólar Estadounidense)');
}
