import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Currency } from '../currencies/currency.entity';
import { User } from '../users/user.entity';
import { seedAdmin } from './seeds/admin.seed';
import { seedCurrencies } from './seeds/currencies.seed';
import { baseDataSourceOptions } from './data-source';

const dataSource = new DataSource({
  ...baseDataSourceOptions,
  entities: [User, Currency],
  synchronize: false,
});

async function main() {
  await dataSource.initialize();
  console.log('🔌 Conectado a la base de datos');

  await seedAdmin(dataSource);
  await seedCurrencies(dataSource);

  await dataSource.destroy();
  console.log('🏁 Seed finalizado');
}

main().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});
