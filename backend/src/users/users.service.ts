import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(email: string, password: string, name: string, role: UserRole = 'customer'): Promise<User> {
    const exists = await this.usersRepo.findOneBy({ email });
    if (exists) throw new ConflictException('El email ya está registrado');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ email, password: hashed, name, role });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ id });
  }
}
