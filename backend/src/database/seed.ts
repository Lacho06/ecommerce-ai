import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { seedAdmin } from './seeds/admin.seed';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'postgres',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],
  synchronize: false,
});

async function main() {
  await dataSource.initialize();
  console.log('🔌 Conectado a la base de datos');

  await seedAdmin(dataSource);

  await dataSource.destroy();
  console.log('🏁 Seed finalizado');
}

main().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});
