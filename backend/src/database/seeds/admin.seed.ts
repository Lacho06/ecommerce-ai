import { DataSource } from 'typeorm';
import { User } from '../../users/user.entity';
import { UserFactory } from '../factories/user.factory';

export async function seedAdmin(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(User);

  const exists = await repo.findOneBy({ email: 'admin@gmail.com' });
  if (exists) {
    console.log('⚠️  El usuario admin ya existe, omitiendo.');
    return;
  }

  const data = await UserFactory.make({
    email: 'admin@gmail.com',
    password: '12345678',
    name: 'Admin',
    role: 'admin',
  });

  await repo.save(repo.create(data));
  console.log('✅ Usuario admin creado: admin@gmail.com');
}
