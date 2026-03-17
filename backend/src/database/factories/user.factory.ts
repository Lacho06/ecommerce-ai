import * as bcrypt from 'bcrypt';
import type { UserRole } from '../../users/user.entity';

interface UserFields {
  email?: string;
  password?: string;
  name?: string;
  role?: UserRole;
}

export class UserFactory {
  static async make(fields: UserFields = {}): Promise<{
    email: string;
    password: string;
    name: string;
    role: UserRole;
  }> {
    return {
      email: fields.email ?? 'user@example.com',
      password: await bcrypt.hash(fields.password ?? 'password', 10),
      name: fields.name ?? 'Default User',
      role: fields.role ?? 'customer',
    };
  }
}
