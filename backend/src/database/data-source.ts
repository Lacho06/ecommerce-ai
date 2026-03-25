import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Product } from '../products/product.entity';
import { Tag } from '../tags/tag.entity';
import { User } from '../users/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'postgres',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Product, Category, Tag],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;
