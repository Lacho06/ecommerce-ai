import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const baseDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'postgres',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

const AppDataSource = new DataSource({
  ...baseDataSourceOptions,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;
